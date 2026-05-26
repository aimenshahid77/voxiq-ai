import LoginForm from "@/components/auth/LoginForm";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#FEF0AF] text-gray-900 font-['Poppins',sans-serif] py-12 px-4 sm:px-6 lg:px-8">
      {/* Header with Logo and Tagline */}
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <img src="/favicon.svg" alt="VeraLogo" className="h-16 w-16 mr-2" />
          <h1 className="text-4xl font-bold text-black">Vera</h1>
        </div>
        <p className="text-xl text-gray-700">Your personal AI interview coach</p>
      </div>

      {/* Login Form Card */}
      <div className="bg-white p-8 rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.15)] w-full max-w-md">
        <LoginForm toggle={() => navigate("/register")} />
      </div>
    </div>
  );
};

export default LoginPage;

