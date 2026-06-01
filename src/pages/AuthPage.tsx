import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // We initialize the state based on the current URL
  const [isSignIn, setIsSignIn] = useState(
    location.pathname === "/login" || location.pathname === "/"
  );

  // Sync state to URL seamlessly without full remounts
  useEffect(() => {
    if (isSignIn && location.pathname !== "/login") {
      navigate("/login", { replace: true });
    } else if (!isSignIn && location.pathname !== "/register") {
      navigate("/register", { replace: true });
    }
  }, [isSignIn, location.pathname, navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-gray-900 font-['Poppins',sans-serif] transition-colors duration-300 dark:bg-[#0f1717] dark:text-white">
      {/* BACKGROUND SLIDER (Replaces the ::before pseudo element) */}
      <div
        className={`absolute top-0 h-screen transition-all duration-1000 ease-in-out shadow-[0_5px_15px_rgba(0,0,0,0.35)] bg-gradient-to-br from-[#2A6666] to-[#5D8874] dark:from-[#183f3f] dark:to-[#2A6666] 
          /* Mobile styles (covers screen, no slide) */
          w-full right-0 z-0 translate-x-0 rounded-none
          /* Desktop styles (half screen, slides) */
          md:w-[300vw] md:right-1/2 md:z-6 md:rounded-br-[max(50vw,50vh)] md:rounded-tl-[max(50vw,50vh)] 
          ${isSignIn ? "md:translate-x-0" : "md:translate-x-full"}`}
      />

      {/* FORM SECTION (Base Layer z=1) */}
      <div className="flex flex-wrap h-screen w-full relative z-1">
        {/* SIGN UP FORM COLUMN */}
        <div
          className={`w-full absolute bottom-0 left-0 p-8 bg-white rounded-t-[2rem] transition-transform duration-1000 ease-in-out dark:bg-[#142020]
            /* Desktop styles */
            md:w-1/2 md:static md:p-0 md:bg-transparent md:rounded-none md:translate-y-0 md:h-full md:flex md:items-center md:justify-center md:flex-col
            ${isSignIn ? "translate-y-full" : "translate-y-0"}`}
        >
          <div className="w-full max-w-md mx-auto md:px-0">
            <div
              className={`p-0 bg-transparent transition-transform duration-500 ease-in-out
                /* Desktop card styles */
                md:p-8 md:bg-white md:rounded-3xl md:shadow-[0_5px_15px_rgba(0,0,0,0.35)] md:dark:bg-[#142020] md:dark:border md:dark:border-white/10
                md:max-h-[85vh] md:overflow-y-auto
                ${isSignIn ? "md:scale-0 md:delay-0 md:pointer-events-none" : "md:scale-100 md:delay-[1000ms]"}`}
            >
              <RegisterForm toggle={() => setIsSignIn(true)} />
            </div>
          </div>
        </div>

        {/* SIGN IN FORM COLUMN */}
        <div
          className={`w-full absolute bottom-0 left-0 p-8 bg-white rounded-t-[2rem] transition-transform duration-1000 ease-in-out dark:bg-[#142020]
            /* Desktop styles */
            md:w-1/2 md:static md:p-0 md:bg-transparent md:rounded-none md:translate-y-0 md:h-full md:flex md:items-center md:justify-center md:flex-col
            ${isSignIn ? "translate-y-0" : "translate-y-full"}`}
        >
          <div className="w-full max-w-[28rem] mx-auto md:px-0">
            <div
              className={`p-0 bg-transparent transition-transform duration-500 ease-in-out
                /* Desktop card styles */
                md:p-8 md:bg-white md:rounded-3xl md:shadow-[0_5px_15px_rgba(0,0,0,0.35)] md:dark:bg-[#142020] md:dark:border md:dark:border-white/10
                md:max-h-[85vh] md:overflow-y-auto
                ${isSignIn ? "md:scale-100 md:delay-[1000ms]" : "md:scale-0 md:delay-0 md:pointer-events-none"}`}
            >
              <LoginForm toggle={() => setIsSignIn(false)} />
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT SECTION (Overlay Layer z=6) */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-wrap pointer-events-none z-[6] flex-col md:flex-row">
        {/* SIGN IN CONTENT (Left side overlay) */}
        <div
          className={`w-full h-1/2 flex items-center justify-center flex-col text-white px-8 absolute top-0 left-0 transition-transform duration-1000 ease-in-out
            /* Desktop styles */
            md:w-1/2 md:h-full md:static
            ${isSignIn ? "md:-translate-x-12" : "-translate-x-[250%]"}`}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold my-2 md:my-8 tracking-wide">Welcome</h2>
            <p className="hidden md:block font-semibold text-lg max-w-md mx-auto">
              Log in to continue your journey and master your next interview.
            </p>
          </div>
        </div>

        {/* SIGN UP CONTENT (Right side overlay) */}
        <div
          className={`w-full h-1/2 flex items-center justify-center flex-col text-white px-8 absolute top-0 left-0 transition-transform duration-1000 ease-in-out
            /* Desktop styles */
            md:w-1/2 md:h-full md:static
            ${isSignIn ? "translate-x-[250%]" : "md:translate-x-12"}`}
        >
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-extrabold my-2 md:my-8 tracking-wide">Join with us</h2>
            <p className="hidden md:block font-semibold text-lg max-w-md mx-auto">
              Create an account to start practicing with our AI right away.
              And then take the mock Interview whenever you are ready!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
