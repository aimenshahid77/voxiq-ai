import React, { useEffect, useRef, useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  ClipboardList,
  FileText,
  MessageSquareQuote,
  TrendingUp,
} from "lucide-react";

const scoreMetrics = [
  { label: "Technical competence", value: 86 },
  { label: "Communication skills", value: 92 },
  { label: "Problem solving", value: 78 },
];

const featureCards = [
  {
    icon: <TrendingUp className="h-5 w-5" />,
    title: "Overall Interview Score",
    description:
      "Each completed mock interview returns a clear overall score so candidates instantly know how ready they are for the role.",
    widget: (
      <div className="rounded-2xl bg-[#2A6666] p-4 text-white shadow-md shadow-[#2A6666]/15">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#FEF0AF]">
          Overall score
        </p>
        <div className="mt-2 flex items-end justify-between">
          <p className="text-4xl font-black">
            84<span className="text-base text-white/55">/100</span>
          </p>
          <span className="rounded-full bg-[#FEF0AF] px-3 py-1 text-[10px] font-black uppercase tracking-widest text-[#2A6666]">
            Ready
          </span>
        </div>
      </div>
    ),
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: "Metric Breakdown",
    description:
      "The evaluation separates performance into technical competence, communication skills, and problem solving.",
    widget: (
      <div className="space-y-3 rounded-2xl border border-[#E9ECEF] bg-white p-4 dark:border-white/10 dark:bg-white/5">
        {scoreMetrics.map((metric) => (
          <div key={metric.label}>
            <div className="mb-1.5 flex justify-between text-[10px] font-black uppercase tracking-widest">
              <span className="text-[#1a1a1a] dark:text-white/45">
                {metric.label}
              </span>
              <span className="text-[#2A6666] dark:text-[#FEF0AF]">
                {metric.value}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[#E9ECEF] dark:bg-white/10">
              <div
                className="h-full rounded-full bg-[#2A6666] dark:bg-[#FEF0AF]"
                style={{ width: `${metric.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    ),
  },
  {
    icon: <CheckCircle2 className="h-5 w-5" />,
    title: "Strengths You Can Repeat",
    description:
      "The report calls out what already worked, helping candidates preserve strong answers instead of changing everything.",
    widget: (
      <div className="space-y-2 rounded-2xl border border-[#E9ECEF] bg-white p-4 dark:border-white/10 dark:bg-white/5">
        {["Clear STAR structure", "Relevant project examples", "Confident closing"].map(
          (item) => (
            <div key={item} className="flex items-start gap-2">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2A6666] dark:text-[#FEF0AF]" />
              <span className="text-xs font-semibold text-[#1a1a1a] dark:text-white/65">
                {item}
              </span>
            </div>
          ),
        )}
      </div>
    ),
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Improvement Priorities",
    description:
      "Instead of vague advice, candidates get focused areas to improve before the next attempt.",
    widget: (
      <div className="space-y-2 rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] p-4 dark:border-white/10 dark:bg-white/5">
        {["Add more technical tradeoffs", "Tighten the opening summary"].map(
          (item) => (
            <div key={item} className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B957]" />
              <span className="text-xs font-semibold leading-relaxed text-[#1a1a1a] dark:text-white/65">
                {item}
              </span>
            </div>
          ),
        )}
      </div>
    ),
  },
  {
    icon: <MessageSquareQuote className="h-5 w-5" />,
    title: "Detailed Feedback",
    description:
      "The AI explains the score in plain language, tying the feedback back to the answer and interview context.",
    widget: (
      <div className="rounded-2xl border border-[#E9ECEF] bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <p className="text-[10px] font-black uppercase tracking-widest text-[#2A6666] dark:text-[#FEF0AF]">
          Feedback
        </p>
        <p className="mt-2 text-xs font-medium leading-relaxed text-[#1a1a1a] dark:text-white/65">
          Your answer was structured well, but the technical section would be
          stronger with one concrete constraint and the decision you made.
        </p>
      </div>
    ),
  },
  {
    icon: <FileText className="h-5 w-5" />,
    title: "Transcript & History",
    description:
      "Mock sessions are saved so candidates can revisit transcripts, compare attempts, and track progress over time.",
    widget: (
      <div className="rounded-2xl border border-[#E9ECEF] bg-white p-4 dark:border-white/10 dark:bg-white/5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-black text-[#1a1a1a] dark:text-white">
              Session 12
            </p>
            <p className="mt-1 text-[10px] font-semibold text-[#1a1a1a] dark:text-white/40">
              Transcript saved
            </p>
          </div>
          <div className="rounded-2xl bg-[#FEF0AF] px-3 py-2 text-center text-[#2A6666]">
            <p className="text-lg font-black">84</p>
            <p className="text-[9px] font-black uppercase tracking-widest">
              score
            </p>
          </div>
        </div>
      </div>
    ),
  },
];

const Features: React.FC = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>(
    new Array(featureCards.length).fill(false),
  );
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            window.setTimeout(() => {
              setVisibleCards((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 80);
            obs.disconnect();
          }
        },
        { threshold: 0.1 },
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return (
    <section
      id="features"
      className="border-t border-[#E9ECEF] bg-white px-6 py-28 transition-colors duration-300 dark:border-white/10 dark:bg-[#0f1717] sm:px-12"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block rounded-full border border-[#2A6666]/15 bg-[#2A6666]/8 px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-[#2A6666] dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            Evaluation System
          </span>
          <h3 className="mb-4 text-3xl font-black leading-[1.1] tracking-tight text-[#1a1a1a] transition-colors duration-300 dark:text-white sm:text-4xl lg:text-[44px]">
            Feedback that matches the way{" "}
            <em className="not-italic italic text-[#2A6666] dark:text-[#FEF0AF]">
              the app actually scores you
            </em>
          </h3>
          <p className="mx-auto max-w-lg text-[15px] font-medium leading-relaxed text-[#1a1a1a] transition-colors duration-300 dark:text-white/55">
            After a mock interview, the app turns your transcript into a focused
            evaluation: scores, strengths, improvement areas, and detailed
            coaching for the next attempt.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {featureCards.map((card, i) => (
            <div
              key={card.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className={`group relative flex min-h-[310px] flex-col justify-between rounded-3xl border border-[#E9ECEF] bg-white p-7 transition-all duration-500 hover:border-[#2A6666]/20 hover:shadow-lg hover:shadow-[#2A6666]/6 dark:border-white/10 dark:bg-white/[0.04] dark:hover:border-[#FEF0AF]/25 ${
                visibleCards[i] ? "translate-y-0 opacity-100" : "translate-y-5 opacity-0"
              }`}
              style={{
                transitionProperty:
                  "opacity, transform, background-color, border-color, box-shadow",
              }}
            >
              <span className="absolute right-6 top-5 text-[11px] font-black tabular-nums text-[#2A6666]/10 dark:text-[#FEF0AF]/15">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="flex flex-col gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#2A6666]/15 bg-[#2A6666]/8 text-[#2A6666] transition-all duration-300 group-hover:scale-105 group-hover:bg-[#2A6666] group-hover:text-[#FEF0AF] dark:border-[#FEF0AF]/20 dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
                  {card.icon}
                </div>

                <div>
                  <h4 className="mb-2 text-[15px] font-black leading-snug text-[#1a1a1a] transition-colors duration-300 dark:text-white">
                    {card.title}
                  </h4>
                  <p className="text-xs font-medium leading-relaxed text-[#1a1a1a] transition-colors duration-300 dark:text-white/55">
                    {card.description}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-[#E9ECEF] pt-4 dark:border-white/10">
                {card.widget}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
