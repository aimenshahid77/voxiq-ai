import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Mic2 } from "lucide-react";

function MockInterviewPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <main className="min-h-screen bg-[#F8F9FA] px-5 py-8 font-['Poppins',sans-serif] text-[#1a1a1a] transition-colors duration-300 dark:bg-[#0f1717] dark:text-white sm:px-8">
      <div className="mx-auto max-w-4xl">
        <button
          type="button"
          onClick={() => navigate(id ? `/dashboard/interviews/${id}` : "/dashboard/interviews")}
          className="mb-8 inline-flex items-center gap-2 rounded-2xl border border-[#E9ECEF] bg-white px-4 py-2.5 text-xs font-black uppercase tracking-widest text-[#2A6666] shadow-sm transition-all hover:bg-[#F1F3F5] dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF] dark:hover:bg-white/[0.08]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to interview
        </button>

        <section className="rounded-3xl border border-[#E9ECEF] bg-white p-8 text-center shadow-xl shadow-[#2A6666]/8 dark:border-white/10 dark:bg-white/[0.04]">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-3xl bg-[#2A6666]/8 text-[#2A6666] dark:bg-[#FEF0AF]/10 dark:text-[#FEF0AF]">
            <Mic2 className="h-7 w-7" />
          </div>
          <h1 className="mt-5 text-3xl font-black tracking-tight">
            Mock interview
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-relaxed text-[#5C4A3A]/60 dark:text-white/55">
            Start voice mock interviews from the interview prep room. This page
            now matches the dashboard style while the dedicated voice modal
            handles the live session.
          </p>
        </section>
      </div>
    </main>
  );
}

export default MockInterviewPage;
