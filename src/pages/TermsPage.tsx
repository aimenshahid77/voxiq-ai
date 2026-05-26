import React from "react";
import { useNavigate } from "react-router-dom";

const TermsPage: React.FC = () => {
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
        <h1 className="text-4xl font-black text-[#1a1a1a] mb-6 dark:text-white">Terms of Service</h1>
        <p className="text-sm text-[#5C4A3A]/60 mb-10 font-medium dark:text-white/55">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="space-y-8 text-[#1a1a1a]/80 leading-relaxed font-medium dark:text-white/70">
          <section>
            <h2 className="text-2xl font-bold text-[#2A6666] mb-4 dark:text-[#FEF0AF]">1. Agreement to Terms</h2>
            <p>By accessing or using our services, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2A6666] mb-4 dark:text-[#FEF0AF]">2. Intellectual Property</h2>
            <p>The Service and its original content, features, and functionality are and will remain the exclusive property of VOXIQ-AI and its licensors.</p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2A6666] mb-4 dark:text-[#FEF0AF]">3. Termination</h2>
            <p>We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.</p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default TermsPage;
