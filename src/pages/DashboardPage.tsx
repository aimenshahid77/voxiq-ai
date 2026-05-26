import { useLocation } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import ProfileView from "@/components/dashboard/ProfileView";
import InterviewsView from "@/components/dashboard/InterviewsView";

const DashboardPage = () => {
  const location = useLocation();
  const isInterviewsSection = location.pathname.startsWith(
    "/dashboard/interviews",
  );

  return (
    <DashboardLayout>
      {isInterviewsSection ? <InterviewsView /> : <ProfileView />}
    </DashboardLayout>
  );
};

export default DashboardPage;
