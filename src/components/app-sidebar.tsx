import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BriefcaseBusiness,
  Calendar,
  LayoutDashboard,
  LogOut,
  MessageSquareText,
  Plus,
  UserRound,
  X,
} from "lucide-react";
import useAuthStore from "@/store/authStore";
import { useLogout } from "@/hooks/useAuth";
import { useCreateInterview, useInterviews } from "@/hooks/useInterviews";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const newInterviewSchema = z.object({
  job_title: z.string().min(1, "Job title is required"),
  job_description: z.string().min(10, "Please add a job description"),
});

type NewInterviewData = z.infer<typeof newInterviewSchema>;

export function AppSidebar() {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();
  const { mutate: logoutUser } = useLogout();
  const [showNewForm, setShowNewForm] = useState(false);
  const [isSubmittingSidebar, setIsSubmittingSidebar] = useState(false);

  const isInterviewsSection = location.pathname.startsWith("/dashboard/interviews");
  const isProfileActive = location.pathname === "/dashboard";
  const isInterviewsActive = location.pathname.startsWith("/dashboard/interviews");

  const { data: interviews, isLoading } = useInterviews();
  const { mutate: createInterview, isPending } = useCreateInterview();

  const { control, handleSubmit, reset } = useForm<NewInterviewData>({
    resolver: zodResolver(newInterviewSchema),
    defaultValues: { job_title: "", job_description: "" },
  });

  const initials = user
    ? `${user.first_name?.[0] ?? ""}${user.last_name?.[0] ?? ""}`.toUpperCase()
    : "?";

  const onSubmit = (data: NewInterviewData) => {
    if (isSubmittingSidebar) return;
    setIsSubmittingSidebar(true);

    createInterview(data, {
      onSuccess: (newInterview) => {
        toast.success("New interview created!");
        reset();
        setShowNewForm(false);
        setIsSubmittingSidebar(false);
        navigate(`/dashboard/interviews/${newInterview.id}`);
      },
      onError: () => {
        setIsSubmittingSidebar(false);
        toast.error("Failed to create interview. Please try again.");
      },
    });
  };

  const navButtonClass = (active: boolean) =>
    `w-full justify-start gap-3 rounded-2xl px-3 py-2.5 text-sm transition-all duration-200 ${
      active
        ? "bg-[#2A6666] text-white font-black shadow-md shadow-[#2A6666]/15"
        : "text-[#5C4A3A]/75 hover:bg-[#F8F9FA] hover:text-[#2A6666] font-semibold dark:text-white/60 dark:hover:bg-white/[0.06] dark:hover:text-[#FEF0AF]"
    }`;

  return (
    <Sidebar className="border-r border-[#E9ECEF] dark:border-white/10">
      <SidebarHeader className="border-b border-[#E9ECEF] bg-white px-4 py-5 transition-colors duration-300 dark:border-white/10 dark:bg-[#101919]">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex items-center gap-2.5 text-left"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#2A6666] text-[11px] font-black tracking-wider text-[#FEF0AF] shadow-md shadow-[#2A6666]/15">
            AI
          </span>
            <span>
            <span className="block text-base font-black uppercase tracking-wide text-[#2A6666] dark:text-[#FEF0AF]">
              VOXIQ-AI
            </span>
            <span className="block text-[10px] font-bold uppercase tracking-widest text-[#5C4A3A]/45 dark:text-white/40">
              Interview Prep
            </span>
          </span>
        </button>
      </SidebarHeader>

      <SidebarContent className="bg-white transition-colors duration-300 dark:bg-[#101919]">
        <SidebarGroup className="border-b border-[#F1F3F5] p-4 dark:border-white/10">
          <SidebarGroupContent>
            <div className="rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-4 dark:border-white/10 dark:bg-white/[0.04]">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#2A6666] text-sm font-black text-[#FEF0AF] shadow-md shadow-[#2A6666]/15">
                  {initials}
                </div>
                <div className="min-w-0">
                  <p className="truncate text-sm font-black text-[#1a1a1a] dark:text-white">
                    {user?.first_name} {user?.last_name}
                  </p>
                  <p className="truncate text-xs font-semibold text-[#5C4A3A]/55 dark:text-white/50">
                    {user?.current_role || "Set your role"}
                  </p>
                </div>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="p-4">
          <SidebarGroupLabel className="px-1 text-[10px] font-black uppercase tracking-widest text-[#5C4A3A]/45 dark:text-white/35">
            Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1.5">
              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/dashboard")}
                  isActive={isProfileActive}
                  className={navButtonClass(isProfileActive)}
                >
                  <UserRound className="h-4 w-4" />
                  Profile
                </SidebarMenuButton>
              </SidebarMenuItem>

              <SidebarMenuItem>
                <SidebarMenuButton
                  onClick={() => navigate("/dashboard/interviews")}
                  isActive={isInterviewsActive}
                  className={navButtonClass(isInterviewsActive)}
                >
                  <MessageSquareText className="h-4 w-4" />
                  Interviews
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {isInterviewsSection && (
          <SidebarGroup className="p-4 pt-2">
            <SidebarGroupLabel className="flex items-center justify-between px-1 text-[10px] font-black uppercase tracking-widest text-[#5C4A3A]/45 dark:text-white/35">
              My Interviews
              <button
                type="button"
                onClick={() => setShowNewForm((current) => !current)}
                className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#2A6666] text-white shadow-sm shadow-[#2A6666]/20 transition-all hover:bg-[#3A706A] active:scale-95"
                aria-label={showNewForm ? "Close new interview form" : "Create interview"}
              >
                {showNewForm ? <X className="h-3.5 w-3.5" /> : <Plus className="h-3.5 w-3.5" />}
              </button>
            </SidebarGroupLabel>

            {showNewForm && (
              <div className="mb-3 rounded-3xl border border-[#E9ECEF] bg-[#F8F9FA] p-4 dark:border-white/10 dark:bg-white/[0.04]">
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
                  <Controller
                    name="job_title"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <input
                          {...field}
                          placeholder="Job title"
                          className="w-full rounded-2xl border border-[#E9ECEF] bg-white px-3 py-2.5 text-xs font-semibold text-[#1a1a1a] outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF]"
                        />
                        {fieldState.invalid && (
                          <p className="mt-1 text-[10px] font-semibold text-red-500">
                            {fieldState.error?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <Controller
                    name="job_description"
                    control={control}
                    render={({ field, fieldState }) => (
                      <div>
                        <textarea
                          {...field}
                          placeholder="Paste job description..."
                          rows={3}
                          className="w-full resize-none rounded-2xl border border-[#E9ECEF] bg-white px-3 py-2.5 text-xs font-semibold text-[#1a1a1a] outline-none transition-all placeholder:text-[#5C4A3A]/35 focus:border-[#2A6666] dark:border-white/10 dark:bg-white/[0.05] dark:text-white dark:placeholder:text-white/35 dark:focus:border-[#FEF0AF]"
                        />
                        {fieldState.invalid && (
                          <p className="mt-1 text-[10px] font-semibold text-red-500">
                            {fieldState.error?.message}
                          </p>
                        )}
                      </div>
                    )}
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      disabled={isPending || isSubmittingSidebar}
                      className="flex-1 rounded-xl bg-[#2A6666] py-2 text-xs font-black text-white transition-all hover:bg-[#3A706A] active:scale-95 disabled:opacity-60"
                    >
                      {isPending || isSubmittingSidebar ? "Creating..." : "Create"}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowNewForm(false);
                        reset();
                      }}
                      className="flex-1 rounded-xl border border-[#E9ECEF] bg-white py-2 text-xs font-black text-[#5C4A3A]/65 transition-all hover:text-[#2A6666] dark:border-white/10 dark:bg-white/[0.04] dark:text-white/55 dark:hover:text-[#FEF0AF]"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            <SidebarGroupContent>
              <SidebarMenu className="gap-1.5">
                {isLoading ? (
                  <p className="px-3 py-2 text-xs font-semibold text-[#5C4A3A]/50 dark:text-white/45">
                    Loading interviews...
                  </p>
                ) : Array.isArray(interviews) && interviews.length > 0 ? (
                  interviews.map((interview) => {
                    const isActive = location.pathname === `/dashboard/interviews/${interview.id}`;
                    return (
                      <SidebarMenuItem key={interview.id}>
                        <SidebarMenuButton
                          onClick={() => navigate(`/dashboard/interviews/${interview.id}`)}
                          isActive={isActive}
                          className={`h-auto w-full flex-col items-start gap-1 rounded-2xl px-3 py-3 transition-all duration-200 ${
                            isActive
                              ? "bg-[#2A6666] text-white shadow-md shadow-[#2A6666]/15"
                              : "bg-white text-[#5C4A3A]/70 hover:bg-[#F8F9FA] hover:text-[#2A6666] dark:bg-transparent dark:text-white/60 dark:hover:bg-white/[0.06] dark:hover:text-[#FEF0AF]"
                          }`}
                        >
                          <span className="flex w-full items-center gap-2 text-xs font-black">
                            <BriefcaseBusiness className="h-3.5 w-3.5 shrink-0" />
                            <span className="truncate">{interview.job_title}</span>
                          </span>
                          <span
                            className={`flex items-center gap-1.5 pl-5 text-[10px] font-semibold ${
                              isActive ? "text-white/75" : "text-[#5C4A3A]/45 dark:text-white/35"
                            }`}
                          >
                            <Calendar className="h-3 w-3" />
                            {new Date(interview.created_at).toLocaleDateString()}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    );
                  })
                ) : (
                  <div className="rounded-2xl border border-[#E9ECEF] bg-[#F8F9FA] p-4 text-center dark:border-white/10 dark:bg-white/[0.04]">
                    <LayoutDashboard className="mx-auto h-7 w-7 text-[#2A6666]/35" />
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-[#5C4A3A]/55 dark:text-white/50">
                      No interviews yet. Use the plus button to create one.
                    </p>
                  </div>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter className="border-t border-[#E9ECEF] bg-white p-4 transition-colors duration-300 dark:border-white/10 dark:bg-[#101919]">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={() => logoutUser()}
              className="w-full justify-start gap-3 rounded-2xl px-3 py-2.5 text-sm font-bold text-[#5C4A3A]/65 transition-all hover:bg-red-50 hover:text-red-600 dark:text-white/55 dark:hover:bg-red-500/10 dark:hover:text-red-300"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
