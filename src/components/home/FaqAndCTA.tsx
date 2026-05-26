import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/authStore";

const faqData = [
  {
    question: "How realistic are the voice interviews?",
    answer:
      "Extremely realistic. Our conversation engine minimizes latency to simulate natural-language flow. The AI acts as an active listener, asking tailored follow-up questions directly referenced to your previous answers — not reading from a static checklist.",
  },
  {
    question: "Can I practice for highly technical roles?",
    answer:
      "Yes. Our AI coach is trained on complex technical domains. It evaluates coding logic, system architecture considerations, product strategy, and engineering leadership competencies at any scale — from associate to staff level.",
  },
  {
    question: "What kind of feedback do I receive?",
    answer:
      "After each session you receive a granular performance card detailing speaking speed, filler word frequency, structural effectiveness (STAR framework), and relevance to the target job description. You also get specific rewrite suggestions.",
  },
  {
    question: "Is my personal data and CV kept private?",
    answer:
      "Absolutely. We place the highest priority on your privacy. Your uploaded resumes, parsed job criteria, voice recordings, and text transcripts are fully encrypted and securely stored. We never sell or share your data.",
  },
];

const FaqAndCTA: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) =>
    setOpenIndex((prev) => (prev === idx ? null : idx));

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {/* ── FAQ Section ── */}
      <section id="faq" className="py-28 px-6 sm:px-12 bg-white border-t border-[#E9ECEF] transition-colors duration-300 dark:bg-[#0f1717] dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

            {/* Left: Header */}
            <div className="lg:col-span-4">
              <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#2A6666] mb-4 px-4 py-1.5 rounded-full bg-[#2A6666]/8 border border-[#2A6666]/15 dark:text-[#FEF0AF] dark:bg-[#FEF0AF]/10 dark:border-[#FEF0AF]/20">
                FAQ
              </span>
              <h3 className="text-3xl sm:text-4xl font-black text-[#1a1a1a] leading-[1.1] tracking-tight mb-4 transition-colors duration-300 dark:text-white">
                Got questions?{" "}
                <em className="not-italic italic text-[#2A6666] dark:text-[#FEF0AF]">We have answers.</em>
              </h3>
              <p className="text-[15px] text-[#5C4A3A]/55 font-medium leading-relaxed mb-8 transition-colors duration-300 dark:text-white/55">
                Everything you need to know about preparing for your next role using our platform.
              </p>
              <button
                onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                className="inline-flex items-center gap-2 px-6 py-3 bg-[#2A6666] hover:bg-[#3A706A] text-white font-bold text-sm rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-md shadow-[#2A6666]/20"
              >
                Start for free
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>

            {/* Right: Accordion */}
            <div className="lg:col-span-8 flex flex-col gap-3">
              {faqData.map((item, idx) => {
                const isOpen = openIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                      isOpen
                        ? "border-[#2A6666]/30 bg-white shadow-sm shadow-[#2A6666]/5 dark:border-[#FEF0AF]/30 dark:bg-white/[0.06]"
                        : "border-[#E9ECEF] bg-white hover:border-[#2A6666]/20 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#FEF0AF]/25"
                    }`}
                  >
                    <button
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between p-5 sm:p-6 text-left gap-4"
                    >
                      <span className={`text-sm sm:text-[15px] font-bold transition-colors duration-200 ${isOpen ? "text-[#2A6666] dark:text-[#FEF0AF]" : "text-[#1a1a1a] dark:text-white"}`}>
                        {item.question}
                      </span>
                      <span
                        className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                          isOpen ? "bg-[#2A6666] text-[#FEF0AF] rotate-180 dark:bg-[#FEF0AF] dark:text-[#2A6666]" : "bg-[#E9ECEF] text-[#5C4A3A] dark:bg-white/10 dark:text-white/60"
                        }`}
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </span>
                    </button>
                    <div
                      className={`transition-all duration-400 ease-in-out overflow-hidden ${
                        isOpen ? "max-h-56 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <p className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm text-[#5C4A3A]/65 leading-relaxed font-medium border-t border-[#E9ECEF] pt-4 dark:border-white/10 dark:text-white/55">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6 sm:px-12 bg-white border-t border-[#E9ECEF] transition-colors duration-300 dark:bg-[#0f1717] dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="relative bg-[#2A6666] rounded-3xl px-10 sm:px-16 py-16 sm:py-20 overflow-hidden text-center">

            {/* Decorative blobs */}
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-[#FEF0AF]/10 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#2A6666]/60 blur-3xl pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full bg-[#3A706A]/40 blur-2xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#FEF0AF]/30 bg-[#FEF0AF]/10 px-4 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#FEF0AF] animate-pulse" />
                <span className="text-[11px] font-black uppercase tracking-widest text-[#FEF0AF]">
                  Free to start · No credit card needed
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tight">
                Stop dreading interviews.{" "}
                <em className="not-italic italic text-[#FEF0AF]">Start owning them.</em>
              </h2>

              <p className="text-[#FEF0AF]/60 text-sm font-medium max-w-md leading-relaxed">
                Join hundreds of candidates who practiced smarter, spoke with confidence, and landed their dream roles.
              </p>

              <div className="flex flex-wrap gap-3 justify-center">
                <button
                  onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                  className="px-8 py-4 bg-[#FEF0AF] hover:bg-[#F5C96A] text-[#2A6666] font-black text-sm rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-xl shadow-black/20 flex items-center gap-2"
                >
                  Get Started Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
                <button
                  onClick={() => scrollTo("features")}
                  className="px-8 py-4 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold text-sm rounded-2xl transition-all duration-300 hover:scale-[1.02]"
                >
                  See Features
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-white border-t border-[#E9ECEF] px-6 sm:px-12 pt-16 pb-8 transition-colors duration-300 dark:bg-[#0f1717] dark:border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between gap-12 mb-14">

            {/* Brand */}
            <div className="max-w-xs flex flex-col gap-4">
              <div className="flex items-center gap-2.5">
                <div className="h-9 w-9 bg-[#2A6666] rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-[11px] font-black text-[#FEF0AF]">AI</span>
                </div>
                <span className="text-base font-black uppercase tracking-wide text-[#2A6666] dark:text-[#FEF0AF]">
                  VOXIQ-AI
                </span>
              </div>
              <p className="text-sm text-[#5C4A3A]/50 leading-relaxed font-medium dark:text-white/50">
                Realistic conversational AI practice engineered to conquer speaking anxiety and build interview muscle memory.
              </p>
              {/* Social icons */}
              <div className="flex gap-3 mt-1">
                {[
                  { label: "Twitter", path: "M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
                  { label: "LinkedIn", path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
                ].map(({ label, path }) => (
                  <button
                    key={label}
                    aria-label={label}
                    className="w-8 h-8 rounded-lg bg-white border border-[#E9ECEF] flex items-center justify-center text-[#5C4A3A]/50 hover:text-[#2A6666] hover:border-[#2A6666]/30 transition-all duration-200 dark:bg-white/5 dark:border-white/10 dark:text-white/45 dark:hover:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/25"
                  >
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-10">
              {/* Product */}
              <div className="flex flex-col gap-3">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">Product</h5>
                <ul className="flex flex-col gap-2">
                  {[
                    { label: "Home", action: () => window.scrollTo({ top: 0, behavior: "smooth" }) },
                    { label: "Features", action: () => scrollTo("features") },
                    { label: "How It Works", action: () => scrollTo("how-it-works") },
                    { label: "FAQ", action: () => scrollTo("faq") },
                  ].map(({ label, action }) => (
                    <li key={label}>
                      <button
                        onClick={action}
                        className="text-sm text-[#5C4A3A]/55 hover:text-[#2A6666] font-medium transition-colors duration-200 dark:text-white/50 dark:hover:text-[#FEF0AF]"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services */}
              <div className="flex flex-col gap-3">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">Services</h5>
                <ul className="flex flex-col gap-2">
                  {["Adaptive Coaching", "Technical Prep", "Behavioral Track", "Custom Simulations"].map((item) => (
                    <li key={item}>
                      <button
                        onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
                        className="text-sm text-[#5C4A3A]/55 hover:text-[#2A6666] font-medium transition-colors duration-200 dark:text-white/50 dark:hover:text-[#FEF0AF]"
                      >
                        {item}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div className="flex flex-col gap-3 col-span-2 sm:col-span-1">
                <h5 className="text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">Legal</h5>
                <ul className="flex flex-col gap-2">
                  {[
                    { label: "Privacy Policy", path: "/privacy" },
                    { label: "Terms of Service", path: "/terms" },
                    { label: "Help Center", path: "/help" },
                  ].map(({ label, path }) => (
                    <li key={label}>
                      <button
                        onClick={() => navigate(path)}
                        className="text-sm text-[#5C4A3A]/55 hover:text-[#2A6666] font-medium transition-colors duration-200 dark:text-white/50 dark:hover:text-[#FEF0AF]"
                      >
                        {label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-[#E9ECEF] pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 dark:border-white/10">
            <p className="text-[12px] text-[#5C4A3A]/35 font-medium dark:text-white/35">
              © {new Date().getFullYear()} VOXIQ-AI. All rights reserved.
            </p>
            <p className="text-[12px] text-[#5C4A3A]/35 font-medium dark:text-white/35">
              Designed for high-performance job seekers.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FaqAndCTA;
