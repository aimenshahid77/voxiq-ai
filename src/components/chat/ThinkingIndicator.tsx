import React from "react";
import { Sparkles } from "lucide-react";

const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-fade-in">
      <div className="flex max-w-[70%] items-center gap-3 rounded-3xl rounded-tl-md border border-[#E9ECEF] bg-white px-5 py-3.5 text-sm font-semibold text-[#2A6666] shadow-md shadow-[#2A6666]/6 dark:border-white/10 dark:bg-white/[0.06] dark:text-[#FEF0AF]">
        <div className="flex items-center gap-1.5">
          <Sparkles className="h-3.5 w-3.5" />
          <span className="text-[10px] font-black uppercase tracking-widest">
            AI thinking
          </span>
        </div>
        <div className="flex items-center gap-1.5 py-1">
          <span
            className="h-2 w-2 rounded-full bg-[#2A6666] animate-bounce"
            style={{ animationDelay: "-0.3s" }}
          />
          <span
            className="h-2 w-2 rounded-full bg-[#2A6666] animate-bounce"
            style={{ animationDelay: "-0.15s" }}
          />
          <span className="h-2 w-2 rounded-full bg-[#2A6666] animate-bounce" />
        </div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;
