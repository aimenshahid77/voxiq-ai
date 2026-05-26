import React, { useRef, useEffect, useState } from "react";

const steps = [
  {
    num: "01",
    title: "Define Your Target",
    desc: "Input the job title, paste the description, or upload your CV. Our system parses the exact seniority and technical scope to construct a hyper-personalized interview context tailored to that role.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    tag: "Setup",
  },
  {
    num: "02",
    title: "Practice Out Loud",
    desc: "Initiate a high-performance voice session. Converse naturally using your microphone just as you would with a real interviewer. The AI responds contextually, creating a high-fidelity experience.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
      </svg>
    ),
    tag: "Practice",
  },
  {
    num: "03",
    title: "Analyze & Refine",
    desc: "Review granular reports breaking down word choices, pacing, confidence delivery, and conceptual structure. Implement tailored rewrites and instantly repeat sessions to lock in muscle memory.",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    tag: "Improve",
  },
];

const HowItWorks: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (sectionRef.current) obs.observe(sectionRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section
      id="how-it-works"
      ref={sectionRef}
      className="py-28 px-6 sm:px-12 bg-white border-t border-[#E9ECEF] transition-colors duration-300 dark:bg-[#0f1717] dark:border-white/10"
    >
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <span className="inline-block text-[11px] font-black uppercase tracking-widest text-[#2A6666] mb-4 px-4 py-1.5 rounded-full bg-[#2A6666]/8 border border-[#2A6666]/15 dark:text-[#FEF0AF] dark:bg-[#FEF0AF]/10 dark:border-[#FEF0AF]/20">
            The Workflow
          </span>
          <h3 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-[#1a1a1a] leading-[1.1] tracking-tight mb-4 transition-colors duration-300 dark:text-white">
            Simple steps to{" "}
            <em className="not-italic italic text-[#2A6666] dark:text-[#FEF0AF]">interview readiness</em>
          </h3>
          <p className="text-[15px] text-[#5C4A3A]/60 font-medium max-w-lg mx-auto leading-relaxed transition-colors duration-300 dark:text-white/55">
            No complex software to install. Start practicing out loud in less than a minute.
          </p>
        </div>

        {/* Steps — horizontal on desktop, vertical on mobile */}
        <div className="relative">

          {/* Connecting line (desktop only) */}
          <div className="hidden lg:block absolute top-[52px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2A6666]/20 to-transparent z-0 dark:via-[#FEF0AF]/20" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-6 relative z-10">
            {steps.map((step, i) => (
              <div
                key={i}
                className={`flex flex-col items-center text-center transition-all duration-700 ${
                  visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${i * 150}ms` }}
              >
                {/* Step badge + icon */}
                <div className="relative mb-6">
                  <div className={`w-[104px] h-[104px] rounded-3xl flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105 ${
                    i === 1
                      ? "bg-[#2A6666] text-[#FEF0AF] dark:bg-[#FEF0AF] dark:text-[#2A6666]"
                      : "bg-white border-2 border-[#E9ECEF] text-[#2A6666] dark:bg-white/5 dark:border-white/10 dark:text-[#FEF0AF]"
                  }`}>
                    <div className="flex flex-col items-center gap-1">
                      {step.icon}
                      <span className="text-[10px] font-black uppercase tracking-widest opacity-60">{step.tag}</span>
                    </div>
                  </div>
                  <span
                    className={`absolute -top-2 -right-2 w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black border-2 ${
                      i === 1
                        ? "bg-[#FEF0AF] text-[#2A6666] border-[#FEF0AF]"
                        : "bg-white text-[#2A6666] border-[#2A6666]/20 dark:bg-[#142020] dark:text-[#FEF0AF] dark:border-[#FEF0AF]/20"
                    }`}
                  >
                    {step.num}
                  </span>
                </div>

                {/* Text */}
                <div className="max-w-xs">
                  <h4 className="text-lg font-black text-[#1a1a1a] mb-3 tracking-tight transition-colors duration-300 dark:text-white">
                    {step.title}
                  </h4>
                  <p className="text-sm text-[#5C4A3A]/60 font-medium leading-relaxed transition-colors duration-300 dark:text-white/55">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom stat bar */}
        <div
          className={`mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 transition-all duration-700 delay-500 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
          }`}
        >
          {[
            { value: "< 60s", label: "To start your first session" },
            { value: "130–150", label: "Ideal WPM coaching range" },
            { value: "96%", label: "Average clarity improvement" },
            { value: "120+", label: "Specialized role templates" },
          ].map(({ value, label }) => (
            <div
              key={label}
              className="bg-white border border-[#E9ECEF] rounded-2xl p-5 text-center hover:border-[#2A6666]/20 hover:shadow-md hover:shadow-[#2A6666]/5 transition-all duration-300 dark:bg-white/[0.04] dark:border-white/10 dark:hover:border-[#FEF0AF]/25"
            >
              <div className="text-2xl font-black text-[#2A6666] mb-1 dark:text-[#FEF0AF]">{value}</div>
              <div className="text-[11px] text-[#5C4A3A]/50 font-medium leading-snug dark:text-white/45">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
