import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  AlignLeft,
  BriefcaseBusiness,
  Loader2,
  Sparkles,
  X,
} from "lucide-react";
import { useCreateInterview } from "@/hooks/useInterviews";

const newInterviewSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  job_description: z.string().min(10, "Please add a job description"),
});

type NewInterviewData = z.infer<typeof newInterviewSchema>;

const NewInterviewForm = ({ onCancel }: { onCancel: () => void }) => {
  const navigate = useNavigate();
  const { mutate: createInterview, isPending } = useCreateInterview();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<NewInterviewData>({
    resolver: zodResolver(newInterviewSchema),
    defaultValues: {
      job_title: "",
      job_description: "",
    },
  });

  const onSubmit = (data: NewInterviewData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    createInterview(data, {
      onSuccess: (newInterview) => {
        toast.success("Interview created!");
        setIsSubmitting(false);
        onCancel();
        navigate(`/dashboard/interviews/${newInterview.id}`);
      },
      onError: () => {
        setIsSubmitting(false);
        toast.error("Failed to create interview. Please try again.");
      },
    });
  };

  return (
    <div className="flex min-h-full w-full items-center justify-center px-2 py-4 sm:px-4">
      <div className="w-full max-w-2xl rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-xl shadow-[#2A6666]/8 dark:border-white/10 dark:bg-white/[0.04] sm:p-8 lg:p-10">
        <div className="mb-8 border-b border-[#F1F3F5] pb-6 dark:border-white/10">
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2A6666]/8 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            <Sparkles className="h-3.5 w-3.5" />
            New prep session
          </span>
          <h1 className="mt-4 text-3xl font-black tracking-tight text-[#1a1a1a] dark:text-white">
            Create a role-based interview
          </h1>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
            Paste the role details and the AI interviewer will tailor questions,
            follow-ups, and practice guidance to the job.
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="job_title"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                  <BriefcaseBusiness className="h-3.5 w-3.5 text-[#2A6666]" />
                  Job title
                </label>
                <input
                  {...field}
                  placeholder="e.g. Frontend Developer at Google"
                  className={`w-full rounded-2xl border-2 bg-white px-4 py-3.5 text-sm font-medium text-[#1a1a1a] outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF] ${
                    fieldState.invalid ? "border-red-400" : "border-[#E9ECEF]"
                  } dark:border-white/10`}
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
            name="job_description"
            control={control}
            render={({ field, fieldState }) => (
              <div>
                <label className="mb-2 flex items-center gap-2 text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
                  <AlignLeft className="h-3.5 w-3.5 text-[#2A6666]" />
                  Job description
                </label>
                <textarea
                  {...field}
                  placeholder="Paste the job description here..."
                  rows={8}
                  className={`custom-scrollbar w-full resize-none rounded-2xl border-2 bg-white px-4 py-3.5 text-sm font-medium text-[#1a1a1a] outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF] ${
                    fieldState.invalid ? "border-red-400" : "border-[#E9ECEF]"
                  } dark:border-white/10`}
                />
                {fieldState.invalid && (
                  <p className="mt-1.5 text-xs font-semibold text-red-500">
                    {fieldState.error?.message}
                  </p>
                )}
              </div>
            )}
          />

          <div className="flex flex-col gap-3 border-t border-[#F1F3F5] pt-6 dark:border-white/10 sm:flex-row">
            <button
              type="submit"
              disabled={isPending || isSubmitting}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2A6666] px-6 py-3.5 text-sm font-black text-white shadow-lg shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isPending || isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Creating prep...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Start interview prep
                </>
              )}
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl border border-[#E9ECEF] bg-white px-6 py-3.5 text-sm font-black text-[#5C4A3A]/65 transition-all hover:bg-[#F8F9FA] hover:text-[#2A6666] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55 dark:hover:bg-white/[0.08] dark:hover:text-[#FEF0AF]"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewInterviewForm;
