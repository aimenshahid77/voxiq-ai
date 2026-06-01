import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "@/hooks/useAuth";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

const loginSchema = z.object({
  email: z.string().email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const LoginForm = ({ toggle }: { toggle: () => void }) => {
  const { mutate: loginUser, isPending, isError } = useLogin();
  const [isSocialPending, setIsSocialPending] = useState(false);

  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = (data: LoginFormData) => loginUser(data);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col items-center"
    >
      <p className="text-sm text-gray-500 dark:text-white/45 mb-4 font-semibold text-center">continue with</p>
      <SocialLoginButtons
        disabled={isPending || isSocialPending}
        onPendingChange={setIsSocialPending}
      />
      <div className="flex items-center gap-2 my-4 w-full">
        <hr className="flex-1 border-[#E9ECEF] dark:border-white/10" />
        <span className="text-sm text-gray-500 dark:text-white/45 font-semibold">or</span>
        <hr className="flex-1 border-[#E9ECEF] dark:border-white/10" />
      </div>

      <div className="w-full relative my-4">
        {/* Email Icon */}
        <svg
          className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-white/45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          />
        </svg>
        <Controller
          name="email"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                type="email"
                placeholder="Email"
                disabled={isPending || isSocialPending}
                className={`w-full py-4 pl-14 pr-4 bg-[#FEF0AF] rounded-lg border-2 ${fieldState.invalid ? "border-red-500" : "border-[#FEF0AF]"} text-[#1a1a1a] outline-none transition-colors placeholder:text-[#5C4A3A]/45 focus:border-[#2A6666] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/35 dark:border-white/10 dark:focus:border-[#FEF0AF] disabled:opacity-60`}
              />
              {fieldState.invalid && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="w-full relative my-4">
        {/* Password Icon */}
        <svg
          className="absolute top-1/2 left-4 -translate-y-1/2 w-6 h-6 text-gray-500 dark:text-white/45"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                type="password"
                placeholder="Password"
                disabled={isPending || isSocialPending}
                className={`w-full py-4 pl-14 pr-4 bg-[#FEF0AF] rounded-lg border-2 ${fieldState.invalid ? "border-red-500" : "border-[#FEF0AF]"} text-[#1a1a1a] outline-none transition-colors placeholder:text-[#5C4A3A]/45 focus:border-[#2A6666] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/35 dark:border-white/10 dark:focus:border-[#FEF0AF] disabled:opacity-60`}
              />
              {fieldState.invalid && (
                <p className="absolute -bottom-5 left-0 text-xs text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isPending || isSocialPending}
        className="w-full py-3 my-4 rounded-lg border-none bg-[#2A6666] text-white text-xl font-medium cursor-pointer hover:bg-[#3A706A] transition-colors focus:outline-none disabled:opacity-60"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      {isError && (
        <p className="text-sm text-red-500 mb-4">
          Invalid email or password. Please try again.
        </p>
      )}

      <p className="my-2 text-sm text-gray-600 dark:text-white/60">
        <span>Don't have an account? </span>
        <b
          onClick={toggle}
          className="cursor-pointer text-[#2A6666] hover:underline dark:text-[#FEF0AF]"
        >
          Sign up here
        </b>
      </p>
    </form>
  );
};

export default LoginForm;
