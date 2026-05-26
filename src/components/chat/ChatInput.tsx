import { Loader2, Send } from "lucide-react";

interface ChatInputProps {
  message: string;
  sending: boolean;
  onChange: (value: string) => void;
  onSend: () => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
}

const ChatInput = ({
  message,
  sending,
  onChange,
  onSend,
  onKeyDown,
}: ChatInputProps) => {
  return (
    <div className="border-t border-[#E9ECEF] bg-white px-5 py-4 transition-colors duration-300 dark:border-white/10 dark:bg-[#101919] sm:px-6">
      <div className="flex items-end gap-3">
        <textarea
          value={message}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={onKeyDown}
          placeholder="Type a message..."
          rows={2}
          className="min-h-[56px] flex-1 resize-none rounded-2xl border-2 border-[#E9ECEF] bg-white px-4 py-3 text-sm font-medium text-[#1a1a1a] outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF]"
        />
        <button
          onClick={onSend}
          disabled={sending || !message.trim()}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-[#2A6666] px-5 text-sm font-black text-white shadow-md shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:active:scale-100"
        >
          {sending ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <span className="hidden sm:inline">Send</span>
              <Send className="h-4 w-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
