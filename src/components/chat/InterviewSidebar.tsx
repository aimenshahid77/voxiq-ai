import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  BriefcaseBusiness,
  Calendar,
  Loader2,
  MessageSquareText,
  Plus,
} from "lucide-react";
import { useInterviews } from "@/hooks/useInterviews";

interface InterviewSidebarProps {
  onNewInterview: () => void;
}

const InterviewSidebar = ({ onNewInterview }: InterviewSidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { data: interviews, isLoading } = useInterviews();

  return (
    <aside className="hidden h-full w-72 shrink-0 flex-col border-r border-[#E9ECEF] bg-white shadow-sm shadow-[#2A6666]/5 transition-colors duration-300 dark:border-white/10 dark:bg-[#101919] md:flex">
      <div className="border-b border-[#E9ECEF] px-5 py-5 dark:border-white/10">
        <button
          type="button"
          onClick={() => navigate("/dashboard")}
          className="mb-5 inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#5C4A3A]/50 transition-colors hover:text-[#2A6666] dark:text-white/45 dark:hover:text-[#FEF0AF]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Dashboard
        </button>

        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-[#2A6666]">
              Prep room
            </p>
            <h2 className="mt-1 text-lg font-black tracking-tight text-[#1a1a1a] dark:text-white">
              Interviews
            </h2>
          </div>
          <button
            onClick={onNewInterview}
            title="New Interview"
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#2A6666] text-white shadow-md shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="custom-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
        {isLoading ? (
          <div className="flex items-center gap-2 rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] px-4 py-3 text-xs font-bold text-[#2A6666] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF]">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading interviews...
          </div>
        ) : Array.isArray(interviews) && interviews.length > 0 ? (
          interviews.map((interview) => {
            const isActive =
              location.pathname === `/dashboard/interviews/${interview.id}`;
            return (
              <button
                key={interview.id}
                onClick={() => navigate(`/dashboard/interviews/${interview.id}`)}
                className={`group w-full rounded-2xl border p-3.5 text-left transition-all duration-200 ${
                  isActive
                    ? "border-[#2A6666] bg-[#2A6666] text-white shadow-md shadow-[#2A6666]/15"
                    : "border-[#E9ECEF] bg-white text-[#5C4A3A]/70 hover:border-[#2A6666]/25 hover:bg-[#F8F9FA] hover:text-[#2A6666] dark:border-white/10 dark:bg-transparent dark:text-white/60 dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.06] dark:hover:text-[#FEF0AF]"
                }`}
              >
                <div className="flex items-start gap-2.5">
                  <BriefcaseBusiness className="mt-0.5 h-4 w-4 shrink-0" />
                  <p className="flex-1 truncate text-sm font-black leading-tight">
                    {interview.job_title}
                  </p>
                </div>
                <div
                  className={`mt-2 flex items-center gap-1.5 pl-6 text-[10px] font-semibold ${
                    isActive ? "text-white/75" : "text-[#5C4A3A]/45 dark:text-white/35"
                  }`}
                >
                  <Calendar className="h-3 w-3 shrink-0" />
                  <span>
                    {new Date(interview.created_at).toLocaleDateString(undefined, {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </button>
            );
          })
        ) : (
          <div className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-5 text-center dark:border-white/10 dark:bg-white/[0.04]">
            <MessageSquareText className="mx-auto h-8 w-8 text-[#2A6666]/35" />
            <p className="mt-3 text-xs font-semibold leading-relaxed text-[#5C4A3A]/55 dark:text-white/50">
              No interviews yet.
            </p>
            <button
              onClick={onNewInterview}
              className="mt-3 text-xs font-black text-[#2A6666] underline underline-offset-4 transition-colors hover:text-[#3A706A]"
            >
              Create one now
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default InterviewSidebar;
