import { useState } from "react";
import { z } from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "@/hooks/useAuth";
import SocialLoginButtons from "@/components/auth/SocialLoginButtons";

const UserIcon = () => (
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
      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    />
  </svg>
);

const MailIcon = () => (
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
);

const LockIcon = () => (
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
);

const registerSchema = z
  .object({
    first_name: z.string().min(1, "First name is required"),
    last_name: z.string().min(1, "Last name is required"),
    email: z.string().email("Enter a valid email"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[a-zA-Z]/, "Password cannot be entirely numeric"),
    confirmPassword: z.string().min(8, "Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

const RegisterForm = ({ toggle }: { toggle: () => void }) => {
  const { mutate: registerUser, isPending, isError } = useRegister();
  const [isSocialPending, setIsSocialPending] = useState(false);

  const { control, handleSubmit } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _confirm, ...apiData } = data;

    registerUser(apiData);
  };

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

      <div className="w-full relative my-2">
        <UserIcon />
        <Controller
          name="first_name"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                placeholder="First Name"
                disabled={isPending || isSocialPending}
                className={`w-full py-4 pl-14 pr-4 bg-[#FEF0AF] rounded-lg border-2 ${fieldState.invalid ? "border-red-500" : "border-[#FEF0AF]"} text-[#1a1a1a] outline-none transition-colors placeholder:text-[#5C4A3A]/45 focus:border-[#2A6666] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/35 dark:border-white/10 dark:focus:border-[#FEF0AF] disabled:opacity-60`}
              />
              {fieldState.invalid && (
                <p className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="w-full relative my-2">
        <UserIcon />
        <Controller
          name="last_name"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                placeholder="Last Name"
                disabled={isPending || isSocialPending}
                className={`w-full py-4 pl-14 pr-4 bg-[#FEF0AF] rounded-lg border-2 ${fieldState.invalid ? "border-red-500" : "border-[#FEF0AF]"} text-[#1a1a1a] outline-none transition-colors placeholder:text-[#5C4A3A]/45 focus:border-[#2A6666] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/35 dark:border-white/10 dark:focus:border-[#FEF0AF] disabled:opacity-60`}
              />
              {fieldState.invalid && (
                <p className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="w-full relative my-2">
        <MailIcon />
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
                <p className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="w-full relative my-2">
        <LockIcon />
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
                <p className="absolute -bottom-4 left-0 text-[10px] text-red-500">
                  {fieldState.error?.message}
                </p>
              )}
            </>
          )}
        />
      </div>

      <div className="w-full relative my-2">
        <LockIcon />
        <Controller
          name="confirmPassword"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                type="password"
                placeholder="Confirm password"
                disabled={isPending || isSocialPending}
                className={`w-full py-4 pl-14 pr-4 bg-[#FEF0AF] rounded-lg border-2 ${fieldState.invalid ? "border-red-500" : "border-[#FEF0AF]"} text-[#1a1a1a] outline-none transition-colors placeholder:text-[#5C4A3A]/45 focus:border-[#2A6666] dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/35 dark:border-white/10 dark:focus:border-[#FEF0AF] disabled:opacity-60`}
              />
              {fieldState.invalid && (
                <p className="absolute -bottom-4 left-0 text-[10px] text-red-500">
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
        className="w-full py-3 my-4 mt-6 rounded-lg border-none bg-[#2A6666] text-white text-xl font-medium cursor-pointer hover:bg-[#3A706A] transition-colors focus:outline-none disabled:opacity-60"
      >
        {isPending ? "Signing up..." : "Sign up"}
      </button>

      {isError && (
        <p className="text-sm text-red-500 mb-2">Something went wrong.</p>
      )}

      <p className="my-2 text-sm text-gray-600 dark:text-white/60">
        <span>Already have an account? </span>
        <b
          onClick={toggle}
          className="cursor-pointer text-[#2A6666] hover:underline dark:text-[#FEF0AF]"
        >
          Sign in here
        </b>
      </p>
    </form>
  );
};

export default RegisterForm;
