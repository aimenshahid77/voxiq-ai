import React from "react";
import { useNavigate } from "react-router-dom";

const HelpCenterPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] font-['Poppins',sans-serif] transition-colors duration-300 dark:bg-[#0f1717] dark:text-white">
      {/* Header */}
      <header className="py-5 px-6 sm:px-12 border-b border-[#E9ECEF] flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md z-50 dark:bg-[#0f1717]/90 dark:border-white/10">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="h-9 w-9 bg-[#2A6666] rounded-xl flex items-center justify-center shadow-md">
            <span className="text-[11px] font-black text-[#FEF0AF] tracking-wider">AI</span>
          </div>
          <span className="text-base font-black tracking-wide text-[#2A6666] uppercase dark:text-[#FEF0AF]">
            VOXIQ-AI
          </span>
        </div>
        <button
          onClick={() => navigate("/")}
          className="text-sm font-semibold text-[#5C4A3A]/70 hover:text-[#2A6666] transition-colors dark:text-white/60 dark:hover:text-[#FEF0AF]"
        >
          Back to Home
        </button>
      </header>

      {/* Content */}
      <main className="max-w-3xl mx-auto px-6 py-20">
        <h1 className="text-4xl font-black text-[#1a1a1a] mb-6 dark:text-white">Help Center</h1>
        <p className="text-sm text-[#5C4A3A]/60 mb-10 font-medium dark:text-white/55">Find answers to common questions and learn how to use VOXIQ-AI.</p>

        <div className="space-y-8 text-[#1a1a1a]/80 leading-relaxed font-medium dark:text-white/70">
          <section>
            <h2 className="text-2xl font-bold text-[#2A6666] mb-4 dark:text-[#FEF0AF]">Getting Started</h2>
            <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-2xl p-5 mb-4 dark:bg-white/[0.04] dark:border-white/10">
              <h3 className="font-bold text-[#1a1a1a] mb-2 dark:text-white">How do I start my first interview?</h3>
              <p className="text-sm text-[#5C4A3A]/80 dark:text-white/60">Simply sign in to your dashboard, upload your resume or paste a job description, and click "Start Session". Ensure your microphone is enabled when prompted by the browser.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2A6666] mb-4 dark:text-[#FEF0AF]">Account & Billing</h2>
            <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-2xl p-5 mb-4 dark:bg-white/[0.04] dark:border-white/10">
              <h3 className="font-bold text-[#1a1a1a] mb-2 dark:text-white">Is it really free?</h3>
              <p className="text-sm text-[#5C4A3A]/80 dark:text-white/60">Yes! We offer a generous free tier that includes 5 full-length mock interviews per month. No credit card is required to sign up.</p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2A6666] mb-4 dark:text-[#FEF0AF]">Technical Issues</h2>
            <div className="bg-[#F8F9FA] border border-[#E9ECEF] rounded-2xl p-5 dark:bg-white/[0.04] dark:border-white/10">
              <h3 className="font-bold text-[#1a1a1a] mb-2 dark:text-white">My microphone isn't working</h3>
              <p className="text-sm text-[#5C4A3A]/80 dark:text-white/60">Please check your browser permissions and ensure that you have granted access to your microphone. You can usually find this by clicking the lock icon next to the URL bar.</p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default HelpCenterPage;
