import React, { useEffect, useState } from "react";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import SessionCard from "./SessionCard";
import WeekCard from "./WeekCard";
import Axios from "axios";
import ProjectDiaryCard from "./ProjectDiaryCard";
import { createClient } from "@supabase/supabase-js";

export default function Submissions() {
  //getting the session details for the assign session cards
  const [submissionDetails, setSubmissionDetails] = useState([]);

  const getSubmissions = async () => {
    const submissionResponse = await Axios.get(
      "http://localhost:3001/getStudentSubmissions",
      {
        params: {
          id: sessionStorage.getItem("StudentCardID"),
          week: sessionStorage.getItem("GuideWeekNumber"),
        },
      }
    );
    if (submissionResponse.data.length > 0) {
      setSubmissionDetails(submissionResponse.data);
    } else {
      setSubmissionDetails(["No Data"]);
    }
    //console.log("Card for " + sessionStorage.getItem("StudentCardID"));
    console.log(submissionResponse.data);
  };

  useEffect(() => {
    getSubmissions();
  }, []);

  const supabase = createClient(
    "https://bucxmapgbqvszyijxeav.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Y3htYXBnYnF2c3p5aWp4ZWF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTk5NDExNSwiZXhwIjoxOTk1NTcwMTE1fQ.frpT81qIffE-2x1u0Mh-5q9p0ApL5HKlFnzIKIiCVJI"
  );
  const { data, error } = supabase.storage
    .from("userimages")
    .getPublicUrl(
      "public/" +
        sessionStorage.getItem("StudentCardID") +
        "_" +
        sessionStorage.getItem("GuideWeekNumber") +
        ".pdf"
    );
  console.log(data.publicUrl);
  return (
    <div className="ml-5">
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Submissions</h1>
        </div>
        <div className="card col-lg-3">
          <div className="card-body">
            <div className="card-body mt-3">
              <h5 className="card-title">View Submission</h5>
            </div>
            <div className="text-center">
              <a
                href={data.publicUrl}
                className="btn w-100"
                style={{ backgroundColor: "#012970", color: "white" }}
              >
                Click Here!
              </a>
            </div>
          </div>
        </div>

        <div className="pagetitle">
          <h1>View Project Diary Entries </h1>
        </div>
        <div className="d-flex flex-row gap-4 flex-wrap">
          {submissionDetails.map((item) => {
            return (
              <ProjectDiaryCard
                username={item.username}
                task_number={item.task_number}
                session_number={item.session_number}
                work_planned={item.work_planned}
                work_completed={item.work_completed}
                entry_date={item.entry_date}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
