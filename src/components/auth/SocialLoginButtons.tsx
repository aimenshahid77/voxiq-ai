import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  getGoogleAuthUrl,
  getGithubAuthUrl,
  getLinkedinAuthUrl,
} from "@/services/auth";

const useOAuthRedirect = (
  provider: "google" | "github" | "linkedin",
  getAuthUrl: () => Promise<string>,
) => {
  return useMutation({
    mutationFn: getAuthUrl,
    onSuccess: (authUrl) => {
      window.location.href = authUrl;
    },
    onError: () => {
      toast.error(`Failed to connect with ${provider}. Please try again.`);
    },
  });
};

const SocialLoginButtons = () => {
  const { mutate: googleLogin, isPending: googlePending } = useOAuthRedirect(
    "google",
    getGoogleAuthUrl,
  );
  const { mutate: githubLogin, isPending: githubPending } = useOAuthRedirect(
    "github",
    getGithubAuthUrl,
  );
  const { mutate: linkedinLogin, isPending: linkedinPending } =
    useOAuthRedirect("linkedin", getLinkedinAuthUrl);

  return (
    <div className="flex flex-col gap-3 w-full">
      <button
        type="button"
        onClick={() => googleLogin()}
        disabled={googlePending}
        className="rounded-xl border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-bold text-[#2A6666] transition-all hover:border-[#2A6666]/25 hover:bg-[#F8F9FA] disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.08]"
      >
        {googlePending ? "Redirecting..." : "Continue with Google"}
      </button>

      <button
        type="button"
        onClick={() => githubLogin()}
        disabled={githubPending}
        className="rounded-xl border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-bold text-[#2A6666] transition-all hover:border-[#2A6666]/25 hover:bg-[#F8F9FA] disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.08]"
      >
        {githubPending ? "Redirecting..." : "Continue with GitHub"}
      </button>

      <button
        type="button"
        onClick={() => linkedinLogin()}
        disabled={linkedinPending}
        className="rounded-xl border border-[#E9ECEF] bg-white px-4 py-3 text-sm font-bold text-[#2A6666] transition-all hover:border-[#2A6666]/25 hover:bg-[#F8F9FA] disabled:opacity-60 dark:border-white/10 dark:bg-white/[0.04] dark:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.08]"
      >
        {linkedinPending ? "Redirecting..." : "Continue with LinkedIn"}
      </button>
    </div>
  );
};

export default SocialLoginButtons;
