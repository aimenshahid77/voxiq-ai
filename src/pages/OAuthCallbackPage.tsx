import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { exchangeOAuthCode } from "@/services/auth";
import useAuthStore from "@/store/authStore";
import type { User } from "@/types";

const OAuthCallbackPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const { mutate: handleExchange } = useMutation({
    mutationFn: ({
      provider,
      code,
    }: {
      provider: "google" | "github" | "linkedin";
      code: string;
    }) => exchangeOAuthCode(provider, code),
    onSuccess: (user: User) => {
      setUser(user);
      toast.success(`Welcome, ${user.first_name}!`);
      if (!user.onboarding_complete) {
        navigate("/onboarding");
      } else {
        navigate("/dashboard");
      }
    },
    onError: () => {
      toast.error("Authentication failed. Please try again.");
      navigate("/login");
    },
  });

  useEffect(() => {
    const code = searchParams.get("code");
    const provider =
      (searchParams.get("state") as "google" | "github" | "linkedin") ||
      "google";

    if (!code) {
      toast.error("Authentication failed. Please try again.");
      navigate("/login");
      return;
    }

    handleExchange({ provider, code });
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-white text-[#1a1a1a] transition-colors duration-300 dark:bg-[#0f1717] dark:text-white">
      <div className="text-center">
        <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-2 border-[#2A6666] border-t-transparent dark:border-[#FEF0AF] dark:border-t-transparent" />
        <p className="text-sm font-semibold text-[#5C4A3A]/60 dark:text-white/55">Completing authentication...</p>
      </div>
    </div>
  );
};

export default OAuthCallbackPage;
