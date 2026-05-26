import React from "react";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import HowItWorks from "@/components/home/HowItWorks";
import FaqAndCTA from "@/components/home/FaqAndCTA";

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white text-[#1a1a1a] selection:bg-[#2A6666] selection:text-white relative overflow-x-hidden scroll-smooth font-['Poppins',sans-serif] transition-colors duration-300 dark:bg-[#0f1717] dark:text-white">
      <Hero />
      <Features />
      <HowItWorks />
      <FaqAndCTA />
    </div>
  );
};

export default LandingPage;
