import { CheckCircle2, TrendingUp } from "lucide-react";
import type { Evaluation } from "@/types";

interface EvaluationViewProps {
  evaluation: Evaluation;
}

const ScoreBar = ({ label, score }: { label: string; score: number }) => (
  <div>
    <div className="mb-1.5 flex justify-between">
      <span className="text-xs font-bold text-[#5C4A3A]/65 dark:text-white/55">{label}</span>
      <span className="text-xs font-black text-[#2A6666] dark:text-[#FEF0AF]">{score}/100</span>
    </div>
    <div className="h-2 w-full overflow-hidden rounded-full bg-[#E9ECEF] dark:bg-white/10">
      <div
        className="h-full rounded-full bg-[#2A6666] dark:bg-[#FEF0AF]"
        style={{ width: `${score}%` }}
      />
    </div>
  </div>
);

const EvaluationView = ({ evaluation }: EvaluationViewProps) => {
  return (
    <section className="rounded-3xl border border-[#E9ECEF] bg-white p-5 shadow-md shadow-[#2A6666]/5 dark:border-white/10 dark:bg-white/[0.04]">
      <div className="mb-6 flex items-center justify-between gap-4 rounded-3xl bg-[#2A6666] p-5 text-white">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-[#FEF0AF]">
            Overall score
          </p>
          <p className="mt-1 text-4xl font-black">
            {evaluation.overall_score}
            <span className="text-lg text-white/60">/100</span>
          </p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FEF0AF] text-[#2A6666]">
          <TrendingUp className="h-5 w-5" />
        </div>
      </div>

      <div className="mb-6 space-y-4">
        <p className="text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
          Breakdown
        </p>
        <ScoreBar
          label="Technical competence"
          score={evaluation.metrics.technical_competence}
        />
        <ScoreBar
          label="Communication skills"
          score={evaluation.metrics.communication_skills}
        />
        <ScoreBar
          label="Problem solving"
          score={evaluation.metrics.problem_solving}
        />
      </div>

      {evaluation.strengths.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
            Strengths
          </p>
          <ul className="flex flex-col gap-2">
            {evaluation.strengths.map((strength, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs font-medium leading-relaxed text-[#5C4A3A]/70 dark:text-white/60"
              >
                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#2A6666]" />
                <span>{strength}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.areas_for_improvement.length > 0 && (
        <div className="mb-5">
          <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
            Areas for improvement
          </p>
          <ul className="flex flex-col gap-2">
            {evaluation.areas_for_improvement.map((area, index) => (
              <li
                key={index}
                className="flex items-start gap-2 text-xs font-medium leading-relaxed text-[#5C4A3A]/70 dark:text-white/60"
              >
                <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-[#D6B957]" />
                <span>{area}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {evaluation.detailed_feedback && (
        <div className="rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] p-4 dark:border-white/10 dark:bg-white/[0.04]">
          <p className="mb-2 text-[11px] font-black uppercase tracking-widest text-[#1a1a1a] dark:text-white">
            Detailed feedback
          </p>
          <p className="text-xs font-medium leading-relaxed text-[#5C4A3A]/70 dark:text-white/60">
            {evaluation.detailed_feedback}
          </p>
        </div>
      )}
    </section>
  );
};

export default EvaluationView;
