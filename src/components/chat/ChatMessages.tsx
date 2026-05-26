import { Loader2, MessageSquareText } from "lucide-react";
import type { ChatMessage } from "@/types";
import MarkdownRenderer from "./MarkdownRenderer";
import ThinkingIndicator from "./ThinkingIndicator";

interface ChatMessagesProps {
  chatHistory: ChatMessage[] | undefined;
  chatLoading: boolean;
  sending: boolean;
  sendingMessages: Array<{
    id: string;
    content: string;
    role: "user";
    isSending: boolean;
  }>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
  latestAssistantRef: React.RefObject<HTMLDivElement | null>;
}

const ChatMessages = ({
  chatHistory,
  chatLoading,
  sending,
  sendingMessages,
  bottomRef,
  latestAssistantRef,
}: ChatMessagesProps) => {
  if (chatLoading) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3">
        <Loader2 className="h-6 w-6 animate-spin text-[#2A6666]" />
        <p className="text-sm font-semibold text-[#5C4A3A]/60 dark:text-white/55">
          Loading chat...
        </p>
      </div>
    );
  }

  if (
    (!chatHistory || chatHistory.length === 0) &&
    sendingMessages.length === 0
  ) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <div className="max-w-md rounded-3xl border border-[#E9ECEF] bg-white px-8 py-10 text-center shadow-lg shadow-[#2A6666]/6 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-3xl bg-[#2A6666]/8 text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            <MessageSquareText className="h-6 w-6" />
          </div>
          <h3 className="mt-5 text-lg font-black text-[#1a1a1a] dark:text-white">
            Start the conversation
          </h3>
          <p className="mt-2 text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
            Ask the AI to generate questions, review your answer, or help you
            prepare for this role.
          </p>
        </div>
      </div>
    );
  }

  const latestAssistantIndex =
    chatHistory?.reduce(
      (latest, msg, index) => (msg.role === "assistant" ? index : latest),
      -1,
    ) ?? -1;

  return (
    <>
      {chatHistory?.map((msg, index) => {
        const isLatestAssistant =
          msg.role === "assistant" && index === latestAssistantIndex;

        return (
        <div
          key={msg.id}
          ref={isLatestAssistant ? latestAssistantRef : undefined}
          className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
        >
          <div
            className={`max-w-[78%] rounded-3xl border px-5 py-3.5 text-sm font-medium leading-relaxed shadow-md animate-[messageIn_260ms_ease-out] ${
              msg.role === "user"
                ? "rounded-tr-md border-[#2A6666] bg-[#2A6666] text-white shadow-[#2A6666]/12"
                : "rounded-tl-md border-[#E9ECEF] bg-white text-[#1a1a1a] shadow-[#2A6666]/6 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
            }`}
          >
            {msg.role === "user" ? (
              msg.content
            ) : (
              <MarkdownRenderer content={msg.content} />
            )}
          </div>
        </div>
        );
      })}

      {sendingMessages.map((msg) => (
        <div key={msg.id} className="flex justify-end animate-pulse">
          <div className="max-w-[70%] rounded-3xl rounded-tr-md border border-[#2A6666]/20 bg-[#2A6666]/8 px-5 py-3 text-sm font-medium italic text-[#2A6666] shadow-md shadow-[#2A6666]/6 dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            {msg.content}
          </div>
        </div>
      ))}

      {sending && <ThinkingIndicator />}
      <div ref={bottomRef} />
    </>
  );
};

export default ChatMessages;
