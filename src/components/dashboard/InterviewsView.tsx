import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Calendar,
  Loader2,
  MessageSquareText,
} from "lucide-react";
import { useInterviews } from "@/hooks/useInterviews";

const InterviewsView = () => {
  const navigate = useNavigate();
  const { data: interviews, isLoading } = useInterviews();

  return (
    <main className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 lg:py-10">
      <div className="mb-8">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#2A6666]/15 bg-[#2A6666]/8 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#2A6666] dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
          <MessageSquareText className="h-3.5 w-3.5" />
          Interviews
        </span>
        <h1 className="mt-4 text-3xl font-black tracking-tight text-[#1a1a1a] dark:text-white sm:text-4xl">
          Practice sessions
        </h1>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
          Pick a role to continue prep, review AI feedback, or launch a mock
          interview.
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center gap-3 rounded-3xl border border-[#E9ECEF] bg-white p-6 text-sm font-bold text-[#2A6666] shadow-lg shadow-[#2A6666]/6 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF]">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading interviews...
        </div>
      ) : interviews && interviews.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {interviews.map((interview, index) => (
            <button
              key={interview.id}
              type="button"
              onClick={() => navigate(`/dashboard/interviews/${interview.id}`)}
              className="group rounded-3xl border border-[#E9ECEF] bg-white p-5 text-left shadow-lg shadow-[#2A6666]/6 transition-all hover:-translate-y-0.5 hover:border-[#2A6666]/25 hover:shadow-xl hover:shadow-[#2A6666]/10 active:scale-[0.995] dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#FEF0AF]/25 sm:p-6"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#2A6666]/8 text-[#2A6666] transition-all group-hover:bg-[#2A6666] group-hover:text-[#FEF0AF] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
                    <BriefcaseBusiness className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#2A6666]/45">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="h-1 w-1 rounded-full bg-[#E9ECEF] dark:bg-white/20" />
                      <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#5C4A3A]/45 dark:text-white/35">
                        <Calendar className="h-3 w-3" />
                        {new Date(interview.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <h3 className="text-lg font-black tracking-tight text-[#1a1a1a] transition-colors group-hover:text-[#2A6666] dark:text-white dark:group-hover:text-[#FEF0AF]">
                      {interview.job_title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
                      {interview.job_description}
                    </p>
                  </div>
                </div>

                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] text-[#2A6666] transition-all group-hover:translate-x-1 group-hover:border-[#2A6666]/25 group-hover:bg-[#FEF0AF] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#FEF0AF] dark:group-hover:border-[#FEF0AF]/30">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="mx-auto max-w-xl rounded-3xl border border-[#E9ECEF] bg-white p-10 text-center shadow-xl shadow-[#2A6666]/8 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2A6666]/8 text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            <MessageSquareText className="h-7 w-7" />
          </div>
          <h2 className="mt-5 text-xl font-black text-[#1a1a1a] dark:text-white">
            No interviews yet
          </h2>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
            Use the plus button in the sidebar to create your first role-based
            prep session.
          </p>
        </div>
      )}
    </main>
  );
};

export default InterviewsView;
