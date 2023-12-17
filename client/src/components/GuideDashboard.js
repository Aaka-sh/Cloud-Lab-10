import React from "react";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import GuideDashboardMain from "./GuideDashboardMain";
import GuideUserProfile from "./GuideUserProfile";

export default function GuideDashboard() {
  return (
    <div className="ml-5">
      <GuideNavBar />
      <GuideSideBar />
      <GuideDashboardMain />
    </div>
  );
}
