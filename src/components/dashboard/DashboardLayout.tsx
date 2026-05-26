import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import ThemeToggle from "@/components/ThemeToggle";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <div className="flex h-screen w-screen overflow-hidden bg-white font-['Poppins',sans-serif] text-[#1a1a1a] transition-colors duration-300 dark:bg-[#0f1717] dark:text-white">
        <AppSidebar />

        <div className="relative flex flex-1 flex-col overflow-hidden bg-[#F8F9FA] transition-colors duration-300 dark:bg-[#0f1717]">
          <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-white/80 blur-[90px] dark:bg-[#2A6666]/15" />
          <div className="pointer-events-none absolute bottom-0 left-20 h-72 w-72 rounded-full bg-[#F1F3F5]/80 blur-[100px] dark:bg-[#FEF0AF]/8" />

          <header className="relative z-10 flex items-center justify-between border-b border-[#E9ECEF] bg-white/90 px-5 py-3.5 shadow-sm shadow-[#2A6666]/5 backdrop-blur-xl transition-colors duration-300 dark:border-white/10 dark:bg-[#0f1717]/85 sm:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#E9ECEF] bg-white text-[#2A6666] transition-colors hover:border-[#2A6666]/25 hover:bg-[#F8F9FA] dark:border-white/10 dark:bg-white/[0.05] dark:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.08]">
                <SidebarTrigger />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#2A6666]">
                  Workspace
                </p>
                <p className="text-sm font-bold text-[#5C4A3A]/60 dark:text-white/55">
                  Practice, review, and improve.
                </p>
              </div>
            </div>
            <ThemeToggle />
          </header>

          <div className="relative z-10 flex-1 overflow-y-auto custom-scrollbar">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default DashboardLayout;
