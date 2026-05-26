import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

const getInitialTheme = (): "light" | "dark" => {
  if (typeof window === "undefined") return "light";
  const savedTheme = window.localStorage.getItem("theme");
  if (savedTheme === "dark" || savedTheme === "light") return savedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const ThemeToggle = ({ className = "" }: { className?: string }) => {
  const [theme, setTheme] = useState<"light" | "dark">(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <button
      type="button"
      onClick={() =>
        setTheme((current) => (current === "dark" ? "light" : "dark"))
      }
      className={`flex h-10 w-10 items-center justify-center rounded-xl border border-[#E9ECEF] bg-white text-[#2A6666] transition-all hover:border-[#2A6666]/30 hover:bg-[#F8F9FA] active:scale-95 dark:border-white/10 dark:bg-white/[0.05] dark:text-[#FEF0AF] dark:hover:border-[#FEF0AF]/25 dark:hover:bg-white/[0.08] ${className}`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
