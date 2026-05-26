import { useEffect, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import Vapi from "@vapi-ai/web";
import { FileText, Loader2, Mic2, PhoneOff, X } from "lucide-react";

const VapiConstructor =
  (Vapi as unknown as { default: typeof Vapi }).default ?? Vapi;

interface MockInterviewModalProps {
  interviewId: number;
  vapiAssistantId: string;
  onClose: () => void;
  onViewHistory: () => void;
}

const MockInterviewModal = ({
  interviewId,
  vapiAssistantId,
  onClose,
  onViewHistory,
}: MockInterviewModalProps) => {
  const queryClient = useQueryClient();
  const transcriptBottomRef = useRef<HTMLDivElement>(null);
  const vapiRef = useRef<InstanceType<typeof VapiConstructor> | null>(null);

  const [callStatus, setCallStatus] = useState<
    "connecting" | "active" | "ended"
  >("connecting");
  const [transcript, setTranscript] = useState<
    Array<{ role: string; text: string }>
  >([]);
  const [partialTranscript, setPartialTranscript] = useState<{
    role: string;
    text: string;
  } | null>(null);
  const [isSpeaking, setIsSpeaking] = useState<"user" | "assistant" | null>(
    null,
  );

  useEffect(() => {
    transcriptBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [transcript, partialTranscript]);

  useEffect(() => {
    const vapiInstance = new VapiConstructor(
      import.meta.env.VITE_VAPI_PUBLIC_KEY,
    );
    vapiRef.current = vapiInstance;

    const timer = setTimeout(() => {
      vapiInstance.start(vapiAssistantId);
    }, 250);

    vapiInstance.on("call-start", () => {
      setCallStatus("active");
      toast.success("Mock interview started!");
    });

    vapiInstance.on("call-end", () => {
      setCallStatus("ended");
      setIsSpeaking(null);
      setPartialTranscript(null);
      queryClient.invalidateQueries({
        queryKey: ["voiceSessions", interviewId],
      });
      toast.success("Interview ended. Your transcript has been saved.");
    });

    vapiInstance.on("speech-start", () => setIsSpeaking("assistant"));
    vapiInstance.on("speech-end", () => setIsSpeaking(null));

    vapiInstance.on("message", (msg) => {
      if (msg.type === "transcript") {
        if (msg.transcriptType === "partial") {
          setPartialTranscript({ role: msg.role, text: msg.transcript });
        } else if (msg.transcriptType === "final") {
          setTranscript((prev) => [
            ...prev,
            { role: msg.role, text: msg.transcript },
          ]);
          setPartialTranscript(null);
        }
      }
    });

    vapiInstance.on("error", (err) => {
      console.warn("Vapi Call Warning (Non-fatal):", err);
    });

    return () => {
      clearTimeout(timer);
      vapiInstance.stop();
      vapiInstance.removeAllListeners();
      vapiRef.current = null;
    };
  }, [vapiAssistantId, interviewId, queryClient]);

  const handleEndCall = () => {
    vapiRef.current?.stop();
    setCallStatus("ended");
    setIsSpeaking(null);
    setPartialTranscript(null);
  };

  const statusLabel =
    callStatus === "active"
      ? isSpeaking === "assistant"
        ? "AI speaking"
        : "Listening"
      : callStatus === "connecting"
        ? "Connecting"
        : "Ended";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1a1a1a]/35 p-4 backdrop-blur-md animate-fade-in dark:bg-black/55">
      <div className="flex h-[82vh] w-full max-w-2xl flex-col rounded-3xl border border-[#E9ECEF] bg-white p-6 shadow-2xl shadow-[#2A6666]/20 dark:border-white/10 dark:bg-[#101919] sm:p-8">
        <header className="flex items-start justify-between gap-4 border-b border-[#F1F3F5] pb-5 dark:border-white/10">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-[#2A6666]/8 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
              <Mic2 className="h-3 w-3" />
              Voice session
            </span>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-[#1a1a1a] dark:text-white">
              Mock interview
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-black uppercase tracking-widest ${
                callStatus === "active"
                  ? "bg-[#2A6666] text-white"
                  : callStatus === "connecting"
                    ? "bg-[#FEF0AF] text-[#2A6666]"
                    : "bg-[#F1F3F5] text-[#5C4A3A]/65 dark:bg-white/10 dark:text-white/55"
              }`}
            >
              {callStatus === "connecting" && (
                <Loader2 className="h-3 w-3 animate-spin" />
              )}
              {statusLabel}
            </span>
            {callStatus === "ended" && (
              <button
                onClick={onClose}
                className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9ECEF] text-[#5C4A3A]/55 transition-all hover:bg-[#F8F9FA] hover:text-[#2A6666] dark:border-white/10 dark:text-white/50 dark:hover:bg-white/[0.08] dark:hover:text-[#FEF0AF]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </header>

        <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto py-5 pr-1.5">
          {transcript.length === 0 && callStatus === "connecting" && (
            <div className="mx-auto mt-12 flex max-w-sm flex-col items-center gap-3 rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-6 text-center dark:border-white/10 dark:bg-white/[0.04]">
              <Loader2 className="h-8 w-8 animate-spin text-[#2A6666]" />
              <p className="text-sm font-semibold text-[#5C4A3A]/60 dark:text-white/55">
                Connecting to your AI interviewer...
              </p>
            </div>
          )}

          {transcript.length === 0 && callStatus === "active" && (
            <div className="mx-auto mt-12 max-w-sm rounded-3xl border border-[#2A6666]/15 bg-[#2A6666]/8 p-6 text-center text-sm font-black text-[#2A6666] dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
              Interview started. Start speaking.
            </div>
          )}

          {transcript.map((entry, index) => (
            <div
              key={index}
              className={`flex ${entry.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[82%] rounded-3xl border px-5 py-3 text-sm font-medium leading-relaxed shadow-md ${
                  entry.role === "user"
                    ? "rounded-tr-md border-[#2A6666] bg-[#2A6666] text-white shadow-[#2A6666]/12"
                    : "rounded-tl-md border-[#E9ECEF] bg-[#F8F9FA] text-[#1a1a1a] shadow-[#2A6666]/6 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
                }`}
              >
                <p
                  className={`mb-1.5 text-[9px] font-black uppercase tracking-widest ${
                    entry.role === "user" ? "text-white/60" : "text-[#2A6666]/60"
                  }`}
                >
                  {entry.role === "user" ? "You" : "AI interviewer"}
                </p>
                {entry.text}
              </div>
            </div>
          ))}

          {partialTranscript && (
            <div
              className={`flex ${partialTranscript.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[82%] rounded-3xl rounded-tr-md border border-[#2A6666]/20 bg-[#2A6666]/8 px-5 py-3 text-sm font-medium italic leading-relaxed text-[#2A6666] shadow-md shadow-[#2A6666]/6 animate-pulse dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
                <p className="mb-1.5 text-[9px] font-black uppercase tracking-widest text-[#2A6666]/60 dark:text-[#FEF0AF]/70">
                  {partialTranscript.role === "user"
                    ? "You speaking"
                    : "AI speaking"}
                </p>
                {partialTranscript.text}
              </div>
            </div>
          )}

          {callStatus === "ended" && transcript.length > 0 && (
            <div className="mt-4 rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] py-2.5 text-center text-xs font-bold text-[#5C4A3A]/50 dark:border-white/10 dark:bg-white/[0.04] dark:text-white/45">
              Interview ended
            </div>
          )}
          <div ref={transcriptBottomRef} />
        </div>

        <div className="flex flex-col gap-3 border-t border-[#F1F3F5] pt-5 dark:border-white/10 sm:flex-row">
          {(callStatus === "connecting" || callStatus === "active") && (
            <button
              onClick={handleEndCall}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-red-600 px-6 py-3.5 text-sm font-black text-white shadow-md shadow-red-600/15 transition-all hover:bg-red-500 active:scale-95"
            >
              <PhoneOff className="h-4 w-4" />
              End call
            </button>
          )}
          {callStatus === "ended" && (
            <>
              <button
                onClick={onViewHistory}
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#2A6666] px-6 py-3.5 text-sm font-black text-white shadow-md shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95"
              >
                <FileText className="h-4 w-4" />
                View transcript
              </button>
              <button
                onClick={onClose}
                className="inline-flex flex-1 items-center justify-center rounded-2xl border border-[#E9ECEF] bg-white px-6 py-3.5 text-sm font-black text-[#5C4A3A]/65 transition-all hover:bg-[#F8F9FA] hover:text-[#2A6666] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55 dark:hover:bg-white/[0.08] dark:hover:text-[#FEF0AF]"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterviewModal;
