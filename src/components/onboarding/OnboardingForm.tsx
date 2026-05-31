import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  AlertTriangle,
  ArrowRight,
  BriefcaseBusiness,
  CheckCircle2,
  ChevronDown,
  FileText,
  Upload,
} from "lucide-react";
import {
  completeOnboarding,
  getProfile,
  updateProfile,
  uploadResume,
} from "@/services/auth";
import useAuthStore from "@/store/authStore";
import workInProgressImg from "@/assets/work_in_progress.png";

const onboardingSchema = z.object({
  current_role: z.string().min(1, "Current role is required"),
  experience_level: z
    .enum(["junior", "mid", "senior"])
    .refine((val) => ["junior", "mid", "senior"].includes(val), {
      message: "Please select your experience level",
    }),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

const resumeSchema = z.object({
  resume: z
    .instanceof(File)
    .refine((file) => file.size <= 5 * 1024 * 1024, "File must be under 5MB")
    .refine((file) => file.type === "application/pdf", "File must be a PDF"),
});

type OnboardingFormData = z.infer<typeof onboardingSchema>;

const OnboardingForm = () => {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<OnboardingFormData>({
    resolver: zodResolver(onboardingSchema),
    defaultValues: {
      current_role: "",
      experience_level: "junior",
      bio: "",
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const result = resumeSchema.safeParse({ resume: file });
    if (!result.success) {
      setResumeError(result.error.issues[0].message);
      setResumeFile(null);
      return;
    }

    setResumeError("");
    setResumeFile(file);
  };

  const onSubmit = async (data: OnboardingFormData) => {
    if (!resumeFile) {
      setResumeError("Please upload your resume");
      return;
    }

    setIsSubmitting(true);
    try {
      await updateProfile(data);
      await uploadResume(resumeFile);
      await completeOnboarding();

      const updatedUser = await getProfile();
      setUser(updatedUser);

      toast.success("Welcome aboard! Your profile is ready.");
      navigate("/dashboard");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-[#1a1a1a] font-['Poppins',sans-serif] overflow-hidden transition-colors duration-300 dark:bg-[#0f1717] dark:text-white">
      <div className="absolute top-0 right-0 h-[420px] w-[420px] rounded-full bg-[#F8F9FA]/80 blur-[90px] pointer-events-none dark:bg-[#2A6666]/15" />
      <div className="absolute bottom-0 left-0 h-[360px] w-[360px] rounded-full bg-[#F1F3F5]/80 blur-[110px] pointer-events-none dark:bg-[#FEF0AF]/8" />

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-6 py-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A6666] text-[11px] font-black tracking-wider text-[#FEF0AF] shadow-md shadow-[#2A6666]/15">
              AI
            </span>
            <span className="text-base font-black uppercase tracking-wide text-[#2A6666] dark:text-[#FEF0AF]">
              VOXIQ-AI
            </span>
          </button>

          <span className="hidden rounded-full border border-[#2A6666]/15 bg-[#2A6666]/8 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#2A6666] dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF] sm:inline-flex">
            Setup
          </span>
        </header>

        <section className="grid flex-1 grid-cols-1 items-center gap-8 py-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#2A6666] px-4 py-1.5 shadow-md shadow-[#2A6666]/15">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FEF0AF]" />
              <span className="text-[11px] font-bold tracking-wide text-[#FEF0AF]">
                Personalize your practice
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black leading-tight tracking-tight text-[#1a1a1a] dark:text-white sm:text-5xl">
              Build your interview profile.
            </h1>
            <p className="mt-4 max-w-md text-sm font-medium leading-relaxed text-[#5C4A3A]/65 dark:text-white/60">
              Add your role, seniority, background, and resume so each AI
              interview can focus on the questions you are most likely to face.
            </p>

            <div className="mt-8 rounded-3xl border border-[#E9ECEF] bg-white p-5 shadow-lg shadow-[#2A6666]/6 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-center gap-4 border-b border-[#F1F3F5] pb-4 dark:border-white/10">
                <img
                  src={workInProgressImg}
                  alt="Interview profile setup"
                  className="h-20 w-20 rounded-2xl bg-[#F8F9FA] object-contain p-2 dark:bg-white/[0.05]"
                />
                <div>
                  <p className="text-xs font-black uppercase tracking-widest text-[#2A6666]">
                    Next up
                  </p>
                  <p className="mt-1 text-sm font-semibold leading-relaxed text-[#5C4A3A]/70 dark:text-white/60">
                    Your dashboard, chat prep, and mock interviews will use this
                    context automatically.
                  </p>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                {["Profile", "Resume", "Practice"].map((item, index) => (
                  <div
                    key={item}
                    className="rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] px-3 py-3 dark:border-white/10 dark:bg-white/[0.04]"
                  >
                    <p className="text-[10px] font-black text-[#2A6666]">
                      0{index + 1}
                    </p>
                    <p className="mt-1 text-[11px] font-bold text-[#5C4A3A]/65 dark:text-white/55">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="mx-auto w-full max-w-2xl rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-xl shadow-[#2A6666]/8 dark:border-white/10 dark:bg-white/[0.04] sm:p-8 lg:p-10">
              <div className="mb-7">
                <p className="text-[11px] font-black uppercase tracking-widest text-[#2A6666]">
                  Final step
                </p>
                <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#1a1a1a] dark:text-white">
                  Setup your profile
                </h2>
                <p className="mt-2 text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
                  Keep it concise. You can update everything later from your
                  dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <Controller
                  name="current_role"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                        <BriefcaseBusiness className="h-3.5 w-3.5 text-[#2A6666]" />
                        Current role
                      </label>
                      <input
                        {...field}
                        placeholder="e.g. Frontend Developer"
                        className={`w-full rounded-2xl border-2 bg-white px-4 py-3 text-sm font-medium text-[#1a1a1a] outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF] ${
                          fieldState.invalid ? "border-red-400" : "border-[#E9ECEF]"
                        } dark:border-white/10`}
                      />
                      {fieldState.invalid && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {fieldState.error?.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="experience_level"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                        Experience level
                      </label>
                      <div className="relative">
                        <select
                          {...field}
                          className="w-full appearance-none rounded-2xl border-2 border-[#E9ECEF] bg-white px-4 py-3 pr-11 text-sm font-medium text-[#1a1a1a] outline-none transition-all focus:border-[#2A6666] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:focus:border-[#FEF0AF]"
                        >
                          <option value="junior" className="dark:bg-[#142020] dark:text-white">Junior</option>
                          <option value="mid" className="dark:bg-[#142020] dark:text-white">Mid</option>
                          <option value="senior" className="dark:bg-[#142020] dark:text-white">Senior</option>
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C4A3A]/50 dark:text-white/45" />
                      </div>
                      {fieldState.invalid && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {fieldState.error?.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name="bio"
                  control={control}
                  render={({ field, fieldState }) => (
                    <div>
                      <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                        Bio
                      </label>
                      <textarea
                        {...field}
                        placeholder="Tell us about your background, projects, or goals..."
                        rows={4}
                        className={`min-h-[110px] w-full resize-none rounded-2xl border-2 bg-white px-4 py-3 text-sm font-medium text-[#1a1a1a] outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF] ${
                          fieldState.invalid ? "border-red-400" : "border-[#E9ECEF]"
                        } dark:border-white/10`}
                      />
                      {fieldState.invalid && (
                        <p className="mt-1.5 text-xs font-medium text-red-500">
                          {fieldState.error?.message}
                        </p>
                      )}
                    </div>
                  )}
                />

                <div>
                  <label className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                    <FileText className="h-3.5 w-3.5 text-[#2A6666]" />
                    Resume
                  </label>
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-[#2A6666]/25 bg-[#F8F9FA] px-4 py-5 text-center transition-all hover:border-[#2A6666]/45 hover:bg-[#F1F3F5] dark:border-[#FEF0AF]/20 dark:bg-white/[0.04] dark:hover:border-[#FEF0AF]/35 dark:hover:bg-white/[0.08]">
                    <Upload className="h-5 w-5 text-[#2A6666]" />
                    <span className="mt-2 text-sm font-black text-[#2A6666]">
                      {resumeFile ? "Change resume" : "Upload resume"}
                    </span>
                    <span className="mt-1 text-xs font-medium text-[#5C4A3A]/55 dark:text-white/50">
                      PDF only, max 5MB
                    </span>
                    <input
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  {resumeFile && (
                    <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#2A6666]">
                      <CheckCircle2 className="h-4 w-4" />
                      {resumeFile.name}
                    </p>
                  )}
                  {resumeError && (
                    <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-red-500">
                      <AlertTriangle className="h-4 w-4" />
                      {resumeError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#2A6666] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {isSubmitting ? "Setting up profile..." : "Complete onboarding"}
                  {!isSubmitting && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default OnboardingForm;
