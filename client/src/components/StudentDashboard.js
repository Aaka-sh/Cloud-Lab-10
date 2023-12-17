import React from "react";
import StudentNavBar from "./StudentNavBar";
import StudentSideBar from "./StudentSideBar";
import StudentDashboardMain from "./StudentDashboardMain";
import StudentUserProfile from "./StudentUserProfile";

export default function GuideDashboard() {
  return (
    <div className="ml-5">
      <StudentNavBar />
      <StudentSideBar />
      <StudentDashboardMain />
    </div>
  );
}
