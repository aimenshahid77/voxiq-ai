import { ArrowLeft, Calendar, ChevronRight, Clock3, X } from "lucide-react";
import type { MockSession } from "@/types";
import { useSessionDetail } from "@/hooks/useInterviews";
import EvaluationView from "./EvaluationView";
import MarkdownRenderer from "./MarkdownRenderer";

interface SessionHistoryModalProps {
  voiceSessions: MockSession[] | undefined;
  selectedSession: MockSession | null;
  onSelectSession: (session: MockSession) => void;
  onBack: () => void;
  onClose: () => void;
}

const SessionHistoryModal = ({
  voiceSessions,
  selectedSession,
  onSelectSession,
  onBack,
  onClose,
}: SessionHistoryModalProps) => {
  const { data: detailedSession, isLoading: detailLoading } = useSessionDetail(
    selectedSession?.id ?? 0,
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/35 p-4 backdrop-blur-md animate-fade-in dark:bg-black/55">
      <div className="custom-scrollbar max-h-[82vh] w-full max-w-2xl overflow-y-auto rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-2xl shadow-[#2A6666]/20 dark:border-white/10 dark:bg-[#101919] sm:p-8">
        <header className="mb-6 flex items-start justify-between gap-4 border-b border-[#F1F3F5] pb-5 dark:border-white/10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2A6666]/8 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
              <Clock3 className="h-3 w-3" />
              Voice history
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#1a1a1a] dark:text-white">
              Mock interview history
            </h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9ECEF] text-[#5C4A3A]/55 transition-all hover:bg-[#F8F9FA] hover:text-[#2A6666] dark:border-white/10 dark:text-white/50 dark:hover:bg-white/[0.08] dark:hover:text-[#FEF0AF]"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </header>

        {!selectedSession ? (
          voiceSessions && voiceSessions.length > 0 ? (
            <div className="flex flex-col gap-3">
              {voiceSessions.map((session) => (
                <button
                  key={session.id}
                  onClick={() => onSelectSession(session)}
                  className="group w-full rounded-3xl border border-[#E9ECEF] bg-white p-4 text-left shadow-md shadow-[#2A6666]/5 transition-all hover:border-[#2A6666]/25 hover:bg-[#F8F9FA] hover:shadow-lg hover:shadow-[#2A6666]/8 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.08]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-black text-[#1a1a1a] dark:text-white">
                        Session {session.id}
                      </p>
                      <p className="mt-1.5 text-xs font-semibold text-[#5C4A3A]/55 dark:text-white/50">
                        Status:{" "}
                        <span className="font-black text-[#2A6666] dark:text-[#FEF0AF]">
                          {session.status}
                        </span>
                      </p>
                      <p className="mt-1 flex items-center gap-1.5 text-xs font-semibold text-[#5C4A3A]/55 dark:text-white/50">
                        <Calendar className="h-3.5 w-3.5" />
                        {new Date(session.started_at).toLocaleDateString(
                          undefined,
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          },
                        )}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {session.evaluation && (
                        <div className="rounded-2xl bg-[#FEF0AF] px-3 py-2 text-center text-[#2A6666]">
                          <p className="text-xl font-black">
                            {session.evaluation.overall_score}
                          </p>
                          <p className="text-[10px] font-black uppercase tracking-widest">
                            score
                          </p>
                        </div>
                      )}
                      <ChevronRight className="h-5 w-5 text-[#2A6666]/45 transition-all group-hover:translate-x-1 group-hover:text-[#2A6666]" />
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <p className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] px-6 py-8 text-center text-sm font-semibold text-[#5C4A3A]/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
              No mock sessions yet.
            </p>
          )
        ) : (
          <div>
            <div className="mb-5 flex items-center justify-between gap-4">
              <h3 className="text-lg font-black text-[#1a1a1a] dark:text-white">
                Transcript
              </h3>
              <button
                onClick={onBack}
                className="inline-flex items-center gap-2 rounded-2xl border border-[#E9ECEF] bg-white px-4 py-2 text-xs font-black text-[#2A6666] transition-all hover:bg-[#F8F9FA] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF] dark:hover:bg-white/[0.08]"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Back
              </button>
            </div>

            {detailLoading ? (
              <div className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] px-6 py-8 text-center text-sm font-semibold text-[#5C4A3A]/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                Loading transcript...
              </div>
            ) : detailedSession?.transcript &&
              detailedSession.transcript.length > 0 ? (
              <div className="custom-scrollbar mb-6 flex max-h-[35vh] flex-col gap-3 overflow-y-auto rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-4 dark:border-white/10 dark:bg-white/[0.04]">
                {detailedSession.transcript.map((entry, index) => (
                  <div
                    key={index}
                    className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-3xl border px-4 py-2.5 text-xs font-medium leading-relaxed shadow-sm ${
                        entry.role === "user"
                          ? "rounded-tr-md border-[#2A6666] bg-[#2A6666] text-white"
                          : "rounded-tl-md border-[#E9ECEF] bg-white text-[#1a1a1a] dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                      }`}
                    >
                      {entry.role === "user" ? (
                        entry.content
                      ) : (
                        <MarkdownRenderer content={entry.content} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="mb-6 rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] px-6 py-6 text-center text-sm font-semibold text-[#5C4A3A]/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                Transcript not available yet.
              </p>
            )}

            {detailedSession?.evaluation ? (
              <EvaluationView evaluation={detailedSession.evaluation} />
            ) : (
              <p className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] px-6 py-6 text-center text-sm font-semibold text-[#5C4A3A]/60 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55">
                Evaluation not available yet.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SessionHistoryModal;
