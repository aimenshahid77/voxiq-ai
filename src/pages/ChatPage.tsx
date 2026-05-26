import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatView from "@/components/chat/ChatView";
import InterviewSidebar from "@/components/chat/InterviewSidebar";
import NewInterviewForm from "@/components/chat/NewInterviewForm";

const ChatPage = () => {
  const { id } = useParams();
  const [showNewForm, setShowNewForm] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNewForm(false);
    }, 0);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8F9FA] font-['Poppins',sans-serif] text-[#1a1a1a] transition-colors duration-300 dark:bg-[#0f1717] dark:text-white">
      <InterviewSidebar onNewInterview={() => setShowNewForm(true)} />

      <div className="relative flex flex-1 flex-col overflow-hidden p-3 sm:p-5">
        <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-white/80 blur-[90px] dark:bg-[#2A6666]/15" />
        <div className="pointer-events-none absolute bottom-0 left-12 h-72 w-72 rounded-full bg-[#F1F3F5]/80 blur-[100px] dark:bg-[#FEF0AF]/8" />

        <div className="relative z-10 flex min-h-0 flex-1 overflow-hidden">
          {showNewForm ? (
            <div className="flex-1 overflow-y-auto">
              <NewInterviewForm onCancel={() => setShowNewForm(false)} />
            </div>
          ) : (
            <ChatView />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
