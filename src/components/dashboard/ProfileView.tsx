import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronDown,
  Download,
  Edit3,
  FileText,
  Save,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import { getProfile, updateProfile, uploadResume, getFreshResumeUrl } from "@/services/auth";

const editSchema = z.object({
  current_role: z.string().min(1, "Role is required"),
  experience_level: z.enum(["junior", "mid", "senior"]),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
});

type EditFormData = z.infer<typeof editSchema>;

const ProfileView = () => {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newResume, setNewResume] = useState<File | null>(null);
  const [resumeWarning, setResumeWarning] = useState(false);
  const [isFetchingResume, setIsFetchingResume] = useState(false);

  const { control, handleSubmit } = useForm<EditFormData>({
    resolver: zodResolver(editSchema),
    defaultValues: {
      current_role: user?.current_role || "",
      experience_level:
        (user?.experience_level as "junior" | "mid" | "senior") || "junior",
      bio: user?.bio || "",
    },
  });

  const handleResumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File must be under 5MB");
      return;
    }
    setResumeWarning(true);
    setNewResume(file);
  };

  const onSubmit = async (data: EditFormData) => {
    setIsSubmitting(true);
    try {
      await updateProfile(data);
      if (newResume) await uploadResume(newResume);
      const updatedUser = await getProfile();
      setUser(updatedUser);
      toast.success("Profile updated successfully!");
      setIsEditing(false);
      setNewResume(null);
      setResumeWarning(false);
    } catch {
      toast.error("Failed to update profile. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleViewResume = async () => {
    setIsFetchingResume(true);
    try {
      const response = await getFreshResumeUrl();
      if (response && response.resume_url) {
        window.open(response.resume_url, "_blank");
      } else {
        toast.error("Could not retrieve resume link.");
      }
    } catch (error) {
      const apiError = error as { response?: { status: number } };
      if (apiError.response?.status === 404) {
        toast.error("No resume uploaded yet.");
      } else {
        toast.error("Failed to open resume. Please try again.");
      }
    } finally {
      setIsFetchingResume(false);
    }
  };

  const profileDetails = [
    { label: "Current role", value: user?.current_role || "Not set" },
    { label: "Experience level", value: user?.experience_level || "Not set" },
  ];

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 lg:py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-[#2A6666]/15 bg-[#2A6666]/8 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#2A6666] dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            <UserRound className="h-3.5 w-3.5" />
            Profile
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#1a1a1a] dark:text-white sm:text-4xl">
            Your interview context
          </h1>
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
            This profile powers your personalized questions, feedback, and mock
            interview sessions.
          </p>
        </div>

        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#2A6666] px-5 py-3 text-sm font-black text-white shadow-lg shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95"
          >
            <Edit3 className="h-4 w-4" />
            Edit profile
          </button>
        )}
      </div>

      <section className="rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-xl shadow-[#2A6666]/8 dark:border-white/10 dark:bg-white/[0.04] sm:p-8">
        <div className="flex flex-col gap-6 border-b border-[#F1F3F5] pb-7 dark:border-white/10 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-3xl bg-[#2A6666] text-2xl font-black text-[#FEF0AF] shadow-lg shadow-[#2A6666]/15">
            {user?.first_name?.[0]}
            {user?.last_name?.[0]}
          </div>
          <div className="min-w-0 flex-1">
            <h2 className="truncate text-2xl font-black capitalize tracking-tight text-[#1a1a1a] dark:text-white sm:text-3xl">
              {user?.first_name} {user?.last_name}
            </h2>
            <p className="mt-1 truncate text-sm font-semibold text-[#5C4A3A]/55 dark:text-white/50">
              {user?.email}
            </p>
            {user?.experience_level && (
              <span className="mt-3 inline-flex rounded-full bg-[#FEF0AF] px-4 py-1.5 text-[10px] font-black uppercase tracking-widest text-[#2A6666]">
                {user.experience_level}
              </span>
            )}
          </div>
        </div>

        {!isEditing ? (
          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            {profileDetails.map((detail) => (
              <div
                key={detail.label}
                className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-5 dark:border-white/10 dark:bg-white/[0.04]"
              >
                <p className="text-[10px] font-black uppercase tracking-widest text-[#2A6666]">
                  {detail.label}
                </p>
                <p className="mt-2 break-words text-base font-bold capitalize text-[#1a1a1a] dark:text-white">
                  {detail.value}
                </p>
              </div>
            ))}

            <div className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-5 dark:border-white/10 dark:bg-white/[0.04] md:col-span-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#2A6666]">
                Bio
              </p>
              <p className="mt-2 whitespace-pre-wrap break-words text-sm font-medium leading-relaxed text-[#5C4A3A]/70 dark:text-white/60">
                {user?.bio || "No bio added"}
              </p>
            </div>

            <div className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-5 dark:border-white/10 dark:bg-white/[0.04] md:col-span-2">
              <p className="text-[10px] font-black uppercase tracking-widest text-[#2A6666]">
                Resume
              </p>
              {user?.resume ? (
                <button
                  type="button"
                  onClick={handleViewResume}
                  disabled={isFetchingResume}
                  className="mt-3 inline-flex items-center gap-2 rounded-2xl border border-[#2A6666]/20 bg-white px-4 py-2.5 text-sm font-black text-[#2A6666] transition-all hover:border-[#2A6666]/40 hover:bg-[#F1F3F5] dark:border-[#FEF0AF]/20 dark:bg-white/[0.05] dark:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/35 dark:hover:bg-white/[0.08] disabled:opacity-60"
                >
                  {isFetchingResume ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-[#2A6666] border-t-transparent dark:border-[#FEF0AF]" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {isFetchingResume ? "Opening..." : "View uploaded resume"}
                </button>
              ) : (
                <p className="mt-2 text-sm font-semibold text-[#5C4A3A]/55 dark:text-white/50">
                  No resume uploaded
                </p>
              )}
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-7 space-y-5">
            <Controller
              name="current_role"
              control={control}
              render={({ field, fieldState }) => (
                <div>
                  <label className="mb-2 block text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                    Current role
                  </label>
                  <input
                    {...field}
                    className={`w-full rounded-2xl border-2 bg-white px-4 py-3 text-sm font-medium outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF] ${
                      fieldState.invalid ? "border-red-400" : "border-[#E9ECEF]"
                    } dark:border-white/10`}
                    placeholder="e.g. Frontend Developer"
                  />
                  {fieldState.invalid && (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">
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
                      className="w-full appearance-none rounded-2xl border-2 border-[#E9ECEF] bg-white px-4 py-3 pr-11 text-sm font-medium outline-none transition-all focus:border-[#2A6666] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:focus:border-[#FEF0AF]"
                    >
                      <option value="junior">Junior</option>
                      <option value="mid">Mid</option>
                      <option value="senior">Senior</option>
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#5C4A3A]/50 dark:text-white/45" />
                  </div>
                  {fieldState.invalid && (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">
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
                    rows={5}
                    className={`min-h-[130px] w-full resize-none rounded-2xl border-2 bg-white px-4 py-3 text-sm font-medium outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF] ${
                      fieldState.invalid ? "border-red-400" : "border-[#E9ECEF]"
                    } dark:border-white/10`}
                    placeholder="Tell us about yourself..."
                  />
                  {fieldState.invalid && (
                    <p className="mt-1.5 text-xs font-semibold text-red-500">
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
                  {newResume ? "Change selected PDF" : "Upload new resume"}
                </span>
                <span className="mt-1 text-xs font-medium text-[#5C4A3A]/55 dark:text-white/50">
                  PDF only, max 5MB
                </span>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </label>
              {newResume && (
                <p className="mt-2 flex items-center gap-2 text-xs font-semibold text-[#2A6666]">
                  <CheckCircle2 className="h-4 w-4" />
                  Selected: {newResume.name}
                </p>
              )}
              {resumeWarning && (
                <div className="mt-3 flex gap-2 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold leading-relaxed text-amber-800 dark:border-amber-300/20 dark:bg-amber-300/10 dark:text-amber-100">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
                  Changing your resume means previous interview chats may no
                  longer match your updated background.
                </div>
              )}
            </div>

            <div className="flex flex-col gap-3 pt-3 sm:flex-row">
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2A6666] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95 disabled:opacity-60"
              >
                <Save className="h-4 w-4" />
                {isSubmitting ? "Saving..." : "Save changes"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setNewResume(null);
                  setResumeWarning(false);
                }}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E9ECEF] bg-white px-6 py-3.5 text-sm font-black text-[#5C4A3A]/65 transition-all hover:bg-[#F8F9FA] hover:text-[#2A6666] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55 dark:hover:bg-white/[0.08] dark:hover:text-[#FEF0AF]"
              >
                <X className="h-4 w-4" />
                Cancel
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  );
};

export default ProfileView;
