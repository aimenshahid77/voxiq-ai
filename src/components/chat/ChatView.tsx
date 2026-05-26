import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { Clock3, Mic2, Sparkles } from "lucide-react";
import {
  useChatHistory,
  useSendMessage,
  useStartVoiceSession,
  useVoiceSessions,
} from "@/hooks/useInterviews";
import type { MockSession } from "@/types";
import ChatInput from "./ChatInput";
import ChatMessages from "./ChatMessages";
import MockInterviewModal from "./MockInterviewModal";
import SessionHistoryModal from "./SessionHistoryModal";
import ThemeToggle from "@/components/ThemeToggle";

const ChatView = () => {
  const { id } = useParams();
  const interviewId = Number(id);
  const bottomRef = useRef<HTMLDivElement>(null);
  const latestAssistantRef = useRef<HTMLDivElement>(null);
  const lastHandledAssistantId = useRef<number | null>(null);

  const [message, setMessage] = useState("");
  const [showHistory, setShowHistory] = useState(false);
  const [showMockModal, setShowMockModal] = useState(false);
  const [vapiAssistantId, setVapiAssistantId] = useState<string>("");
  const [selectedSession, setSelectedSession] = useState<MockSession | null>(
    null,
  );

  type SendingMessage = {
    id: string;
    content: string;
    role: "user";
    isSending: boolean;
  };

  const [sendingMessages, setSendingMessages] = useState<SendingMessage[]>([]);

  const { data: chatHistory, isLoading: chatLoading } =
    useChatHistory(interviewId);
  const { mutate: sendMessage, isPending: sending } =
    useSendMessage(interviewId);
  const { mutate: startSession, isPending: startingSession } =
    useStartVoiceSession(interviewId);
  const { data: voiceSessions } = useVoiceSessions(interviewId);

  useEffect(() => {
    if (sendingMessages.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [sendingMessages]);

  useEffect(() => {
    const messages = chatHistory ?? [];
    const latestMessage = messages[messages.length - 1];

    if (
      latestMessage?.role === "assistant" &&
      latestMessage.id !== lastHandledAssistantId.current
    ) {
      lastHandledAssistantId.current = latestMessage.id;
      window.setTimeout(() => {
        latestAssistantRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 80);
    }
  }, [chatHistory]);

  const handleSend = () => {
    if (!message.trim()) return;
    const messageToSend = message;
    const tempId = `temp-${Date.now()}`;
    setSendingMessages((prev) => [
      ...prev,
      { id: tempId, content: messageToSend, role: "user", isSending: true },
    ]);
    setMessage("");
    sendMessage(messageToSend, {
      onSuccess: () => {
        setSendingMessages((prev: SendingMessage[]) =>
          prev.filter((msg: SendingMessage) => msg.id !== tempId),
        );
      },
      onError: () => {
        toast.error("Failed to send message. Please try again.");
        setMessage(messageToSend);
        setSendingMessages((prev: SendingMessage[]) =>
          prev.filter((msg: SendingMessage) => msg.id !== tempId),
        );
      },
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleStartMock = () => {
    startSession(undefined, {
      onSuccess: (data) => {
        setVapiAssistantId(data.vapi_assistant_id);
        setShowMockModal(true);
      },
      onError: () => {
        toast.error("Failed to start mock interview. Please try again.");
      },
    });
  };

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col overflow-hidden rounded-3xl border border-[#E9ECEF] bg-white shadow-xl shadow-[#2A6666]/8 transition-colors duration-300 dark:border-white/10 dark:bg-[#101919]">
      <header className="flex flex-col gap-4 border-b border-[#E9ECEF] bg-white px-5 py-4 transition-colors duration-300 dark:border-white/10 dark:bg-[#101919] sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#2A6666]/8 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            <Sparkles className="h-3 w-3" />
            AI prep chat
          </span>
          <h2 className="mt-2 text-lg font-black tracking-tight text-[#1a1a1a] dark:text-white">
            Interview prep room
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <ThemeToggle />
          {voiceSessions && voiceSessions.length > 0 && (
            <button
              onClick={() => setShowHistory(true)}
              className="inline-flex items-center gap-2 rounded-2xl border border-[#E9ECEF] bg-white px-4 py-2.5 text-xs font-black text-[#2A6666] transition-all hover:border-[#2A6666]/25 hover:bg-[#F8F9FA] active:scale-95 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.08]"
            >
              <Clock3 className="h-3.5 w-3.5" />
              History ({voiceSessions.length})
            </button>
          )}
          <button
            onClick={handleStartMock}
            disabled={startingSession || showMockModal}
            className="inline-flex items-center gap-2 rounded-2xl bg-[#2A6666] px-4 py-2.5 text-xs font-black text-white shadow-md shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Mic2 className="h-3.5 w-3.5" />
            {startingSession
              ? "Connecting..."
              : showMockModal
                ? "In progress..."
                : "Mock interview"}
          </button>
        </div>
      </header>

      <div className="custom-scrollbar flex flex-1 flex-col gap-4 overflow-y-auto bg-[#F8F9FA] px-5 py-6 transition-colors duration-300 dark:bg-[#0f1717] sm:px-6">
        <ChatMessages
          chatHistory={chatHistory}
          chatLoading={chatLoading}
          sending={sending}
          sendingMessages={sendingMessages}
          bottomRef={bottomRef}
          latestAssistantRef={latestAssistantRef}
        />
      </div>

      <ChatInput
        message={message}
        sending={sending}
        onChange={setMessage}
        onSend={handleSend}
        onKeyDown={handleKeyDown}
      />

      {showMockModal && vapiAssistantId && (
        <MockInterviewModal
          interviewId={interviewId}
          vapiAssistantId={vapiAssistantId}
          onClose={() => {
            setShowMockModal(false);
            setVapiAssistantId("");
          }}
          onViewHistory={() => {
            setShowMockModal(false);
            setVapiAssistantId("");
            setShowHistory(true);
          }}
        />
      )}

      {showHistory && (
        <SessionHistoryModal
          voiceSessions={voiceSessions}
          selectedSession={selectedSession}
          onSelectSession={setSelectedSession}
          onBack={() => setSelectedSession(null)}
          onClose={() => {
            setShowHistory(false);
            setSelectedSession(null);
          }}
        />
      )}
    </div>
  );
};

export default ChatView;
