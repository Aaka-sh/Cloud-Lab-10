import React, { useEffect, useState } from "react";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import SessionCard from "./SessionCard";
import WeekCard from "./WeekCard";
import Axios from "axios";
import ProjectDiaryCard from "./ProjectDiaryCard";

export default function Submissions() {
  //getting the week details
  const [weekDetails, setWeekDetails] = useState([]);

  const getWeeks = async () => {
    const weekResponse = await Axios.get("http://localhost:3001/getWeeks");
    if (weekResponse.data.length > 0) {
      setWeekDetails(weekResponse.data);
    } else {
      setWeekDetails(["No Data"]);
    }
    //console.log("Card for " + sessionStorage.getItem("StudentCardID"));
    console.log(weekResponse.data);
  };

  useEffect(() => {
    getWeeks();
  }, []);

  return (
    <div className="ml-5">
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Weeks </h1>
        </div>
        <div className="d-flex flex-row gap-4 flex-wrap">
          {weekDetails.map((item) => {
            return <WeekCard week_number={item.task_number} />;
          })}
        </div>
      </main>
    </div>
  );
}
