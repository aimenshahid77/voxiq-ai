import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Moon, Sun } from "lucide-react";
import useAuthStore from "@/store/authStore";

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMessageIndex, setActiveMessageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    const savedTheme = window.localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveMessageIndex((prev) => (prev + 1) % 3);
    }, 4200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { label: "Home", id: "" },
    { label: "Features", id: "features" },
    { label: "How It Works", id: "how-it-works" },
    { label: "Pricing", id: "faq" },
  ];

  const toggleTheme = () =>
    setTheme((current) => (current === "dark" ? "light" : "dark"));

  return (
    <div className="relative min-h-screen flex flex-col bg-white overflow-hidden transition-colors duration-300 dark:bg-[#0f1717]">

      {/* Very subtle warm texture blob top-right */}
      <div className="absolute top-0 right-0 w-[520px] h-[520px] rounded-full bg-[#F8F9FA]/60 blur-[100px] pointer-events-none -z-0 dark:bg-white/5" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-[#F1F3F5]/70 blur-[120px] pointer-events-none -z-0 dark:bg-[#FEF0AF]/5" />

      {/* ── Navbar ── */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 px-6 sm:px-12 ${
          isScrolled
            ? "py-3 bg-white/90 backdrop-blur-xl border-b border-[#E9ECEF] shadow-sm shadow-[#2A6666]/5 dark:bg-[#0f1717]/90 dark:border-white/10"
            : "py-5 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">

          {/* Logo */}
          <div
            onClick={() => navigate("/")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="h-9 w-9 bg-[#2A6666] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300">
              <span className="text-[11px] font-black text-[#FEF0AF] tracking-wider">AI</span>
            </div>
            <span className="text-base font-black tracking-wide text-[#2A6666] uppercase dark:text-[#FEF0AF]">
              VOXIQ-AI
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(({ label, id }, i) => (
              <button
                key={label}
                onClick={() => id ? scrollTo(id) : window.scrollTo({ top: 0, behavior: "smooth" })}
                className={`text-sm font-semibold transition-colors duration-200 cursor-pointer pb-0.5 ${
                  i === 0
                    ? "text-[#2A6666] border-b-2 border-[#2A6666] dark:text-[#FEF0AF] dark:border-[#FEF0AF]"
                    : "text-[#5C4A3A]/70 hover:text-[#2A6666] border-b-2 border-transparent hover:border-[#2A6666]/30 dark:text-white/60 dark:hover:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/30"
                }`}
              >
                {label}
              </button>
            ))}
          </nav>

          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9ECEF] bg-white text-[#2A6666] transition-all hover:border-[#2A6666]/30 hover:bg-[#F8F9FA] active:scale-95 dark:border-white/10 dark:bg-white/5 dark:text-[#FEF0AF] dark:hover:bg-white/10"
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            {isAuthenticated ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-sm font-bold bg-[#2A6666] hover:bg-[#3A706A] text-white px-5 py-2.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-2 shadow-md shadow-[#2A6666]/20"
              >
                Dashboard
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-semibold text-[#5C4A3A]/70 hover:text-[#2A6666] transition-colors duration-200 px-4 py-2 dark:text-white/60 dark:hover:text-[#FEF0AF]"
                >
                  Sign Up
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="text-sm font-bold bg-[#2A6666] hover:bg-[#3A706A] text-white px-5 py-2.5 rounded-xl transition-all duration-300 active:scale-95 flex items-center gap-1.5 shadow-md shadow-[#2A6666]/20"
                >
                  Sign In
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            className="md:hidden p-2 rounded-lg border border-[#E9ECEF] text-[#5C4A3A] hover:border-[#2A6666]/30 transition-all dark:border-white/10 dark:text-white/70"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ease-in-out ${
            mobileMenuOpen ? "max-h-80 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white border border-[#E9ECEF] rounded-2xl p-4 flex flex-col gap-1 max-w-7xl mx-auto shadow-lg dark:border-white/10 dark:bg-[#142020]">
            {navLinks.map(({ label, id }) => (
              <button
                key={label}
                onClick={() => id ? scrollTo(id) : window.scrollTo({ top: 0, behavior: "smooth" })}
                className="text-left px-4 py-3 text-sm font-semibold text-[#5C4A3A]/80 hover:text-[#2A6666] hover:bg-[#F1F3F5] rounded-xl transition-all duration-200 dark:text-white/65 dark:hover:bg-white/5 dark:hover:text-[#FEF0AF]"
              >
                {label}
              </button>
            ))}
            <div className="border-t border-[#E9ECEF] pt-3 mt-1 flex flex-col gap-2 dark:border-white/10">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-[#2A6666] bg-[#F8F9FA] hover:bg-[#F1F3F5] rounded-xl transition-all dark:bg-white/5 dark:text-[#FEF0AF] dark:hover:bg-white/10"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
              <button
                onClick={() => { navigate("/login"); setMobileMenuOpen(false); }}
                className="px-4 py-3 text-sm font-bold text-white bg-[#2A6666] hover:bg-[#3A706A] rounded-xl transition-all"
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ── Hero Content ── */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto px-6 sm:px-12 grid grid-cols-1 lg:grid-cols-12 items-center gap-12 lg:gap-8 pt-36 pb-20">

        {/* Left Column */}
        <div className="lg:col-span-6 flex flex-col items-start gap-6">

          {/* Pill badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#2A6666] px-4 py-1.5 shadow-md shadow-[#2A6666]/15">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FEF0AF] animate-pulse" />
            <span className="text-[11px] font-bold text-[#FEF0AF] tracking-wide">
              10+ interviews conducted
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-5xl sm:text-6xl font-black text-[#1a1a1a] leading-[1.07] tracking-tight transition-colors duration-300 dark:text-white">
            Ace your next<br />
            interview,{" "}
            <em className="not-italic italic text-[#2A6666] font-black dark:text-[#FEF0AF]">with<br />confidence.</em>
          </h2>

          {/* Subheading */}
          <p className="text-base text-[#5C4A3A]/65 max-w-md leading-relaxed font-medium transition-colors duration-300 dark:text-white/60">
            Personalized practice, real-time feedback, and expert guidance. Built for humans who get nervous, not robots who don't.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mt-1">
            <button
              onClick={() => navigate(isAuthenticated ? "/dashboard" : "/register")}
              className="px-6 py-3.5 bg-[#2A6666] hover:bg-[#3A706A] text-white font-bold text-sm rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#2A6666]/20 flex items-center gap-2"
            >
              Get started free
            </button>
            <button
              onClick={() => scrollTo("features")}
              className="px-6 py-3.5 bg-white hover:bg-[#F1F3F5] text-[#2A6666] font-bold text-sm rounded-2xl border border-[#E9ECEF] hover:border-[#2A6666]/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] dark:border-white/10 dark:bg-white/5 dark:text-[#FEF0AF] dark:hover:bg-white/10"
            >
              Learn more
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center gap-3 mt-1">
            <div className="flex -space-x-2.5">
              {[
                { initials: "ZA", bg: "bg-[#2A6666]", text: "text-[#FEF0AF]" },
                { initials: "MK", bg: "bg-[#FEF0AF]", text: "text-[#2A6666]" },
                { initials: "SR", bg: "bg-[#2A6666]", text: "text-white" },
                { initials: "FQ", bg: "bg-[#F0D5C8]", text: "text-[#5C2D1E]" },
              ].map(({ initials, bg, text }, i) => (
                <div
                  key={i}
                  className={`w-8 h-8 rounded-full border-2 border-[#FFFFFF] flex items-center justify-center text-[10px] font-black ${bg} ${text}`}
                >
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#5C4A3A]/60 dark:text-white/55">
              <span className="font-bold text-[#1a1a1a] dark:text-white">10+ candidates</span> landed their dream role
            </p>
          </div>
        </div>

        {/* Right Column: Animated Chat Mockup */}
        <div className="lg:col-span-6 w-full flex justify-center items-center relative">

          {/* Large decorative circle behind card */}
          <div className="absolute w-[380px] h-[380px] rounded-full bg-[#F8F9FA]/80 -z-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 dark:bg-white/5" />
          {/* Small decorative dots */}
          <div className="absolute top-[15%] left-[5%] w-5 h-5 rounded-full bg-[#2A6666]/40" />
          <div className="absolute bottom-[20%] right-[8%] w-8 h-8 rounded-full bg-[#2A6666]/60" />
          <div className="absolute top-[12%] right-[12%] w-10 h-10 rounded-full bg-[#2A6666] flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
            </svg>
          </div>

          {/* Main card mockup */}
          <div className="relative z-10 w-full max-w-[380px] bg-white border border-[#E9ECEF]/80 rounded-3xl p-5 shadow-xl shadow-[#2A6666]/8 overflow-hidden dark:border-white/10 dark:bg-white/[0.04]">

            {/* Top bar */}
            <div className="mb-4 pb-3 border-b border-[#F1F3F5] flex items-center justify-between dark:border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                <span className="text-[10px] font-bold text-[#5C4A3A]/50 uppercase tracking-wider dark:text-white/45">AI Session Live</span>
              </div>
              <div className="h-7 w-7 rounded-full bg-white border border-[#E9ECEF] flex items-center justify-center dark:border-white/10 dark:bg-white/5">
                <svg className="w-3.5 h-3.5 text-[#2A6666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
            </div>

            {/* Chat bubbles area */}
            <div className="space-y-3 min-h-[200px] flex flex-col justify-end mb-4">

              {/* AI question */}
              <div className={`transition-all duration-700 transform ${activeMessageIndex >= 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <div className="bg-white border border-[#E9ECEF] rounded-2xl rounded-tl-none p-3.5 max-w-[88%] dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <div className="w-4 h-4 rounded-full bg-[#2A6666] flex items-center justify-center">
                      <svg className="w-2.5 h-2.5 text-[#FEF0AF]" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
                      </svg>
                    </div>
                    <span className="text-[8px] font-black text-[#2A6666]/60 uppercase tracking-wider">AI Coach</span>
                  </div>
                  <p className="text-[11px] text-[#3D2B1F]/80 font-medium leading-relaxed dark:text-white/70">
                    "Walk me through a challenging project where you managed conflicting stakeholder expectations."
                  </p>
                </div>
              </div>

              {/* User answer */}
              <div className={`transition-all duration-700 delay-500 transform ${activeMessageIndex >= 1 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <div className="bg-[#2A6666] rounded-2xl rounded-tr-none p-3.5 ml-auto max-w-[85%]">
                  <p className="text-[11px] text-white/85 font-medium leading-relaxed">
                    "At my previous role, I coordinated a critical API overhaul. Marketing needed features launched immediately, while engineering required two extra weeks..."
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <div className={`transition-all duration-700 delay-1000 transform ${activeMessageIndex >= 2 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                <div className="bg-white border border-[#E9ECEF] rounded-2xl rounded-tl-none p-3 max-w-[90%] dark:border-white/10 dark:bg-white/5">
                  <div className="flex items-center gap-1 mb-1">
                    <svg className="w-3 h-3 text-[#2A6666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-[8px] font-black text-[#2A6666]/60 uppercase tracking-wider">Coaching Feedback</span>
                  </div>
                  <p className="text-[11px] text-[#3D2B1F]/70 leading-relaxed dark:text-white/65">Excellent STAR method structure!</p>
                  <div className="flex gap-3 mt-1.5 text-[9px] font-bold text-[#5C4A3A]/50 dark:text-white/45">
                    <span>Clarity: <strong className="text-[#2A6666]">94%</strong></span>
                    <span>Confidence: <strong className="text-[#2A6666]">88%</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Score bars at bottom */}
            <div className="space-y-2 pt-3 border-t border-[#F1F3F5] dark:border-white/10">
              <div>
                <div className="flex justify-between mb-1 text-[9px] font-bold text-[#5C4A3A]/50 uppercase tracking-wider">
                  <span>Clarity</span><span className="text-[#2A6666]">96%</span>
                </div>
                <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full">
                  <div className="bg-[#2A6666] h-full rounded-full" style={{ width: "96%" }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between mb-1 text-[9px] font-bold text-[#5C4A3A]/50 uppercase tracking-wider">
                  <span>Confidence</span><span className="text-[#2A6666]">88%</span>
                </div>
                <div className="w-full bg-[#F1F3F5] h-1.5 rounded-full">
                  <div className="bg-[#FEF0AF] h-full rounded-full" style={{ width: "88%" }} />
                </div>
              </div>
            </div>
          </div>

          {/* Floating badge bottom-left */}
          <div className="absolute bottom-[8%] left-[2%] z-20 bg-white border border-[#E9ECEF] rounded-2xl px-3.5 py-2.5 shadow-lg shadow-[#2A6666]/8 flex items-center gap-2 dark:border-white/10 dark:bg-[#142020]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black text-[#2A6666] uppercase tracking-wide">Optimal Pace</span>
          </div>
        </div>
      </main>

      {/* Scroll cue */}
      <div className="relative z-10 flex justify-center pb-10">
        <button onClick={() => scrollTo("features")} className="flex flex-col items-center gap-1 group">
          <span className="text-[10px] font-bold text-[#5C4A3A]/30 uppercase tracking-widest group-hover:text-[#2A6666]/50 transition-colors dark:text-white/30 dark:group-hover:text-[#FEF0AF]/60">
            Scroll
          </span>
          <svg className="w-4 h-4 text-[#5C4A3A]/30 group-hover:text-[#2A6666]/50 transition-colors animate-bounce dark:text-white/30 dark:group-hover:text-[#FEF0AF]/60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Hero;
