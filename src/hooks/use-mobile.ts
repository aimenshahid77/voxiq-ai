import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  // Initialize state directly from the window width (using a lazy initializer function)
  const [isMobile, setIsMobile] = React.useState<boolean>(
    () =>
      typeof window !== "undefined" && window.innerWidth < MOBILE_BREAKPOINT,
  );

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    mql.addEventListener("change", onChange);

    // Cleanup event listener (no synchronous setState call needed here anymore)
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return isMobile;
}
