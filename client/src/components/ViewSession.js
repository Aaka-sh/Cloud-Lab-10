import React, { useState, useEffect } from "react";
import Axios from "axios";
import StudentSessionCard from "./StudentSessionCard";
import StudentSideBar from "./StudentSideBar";
import StudentNavBar from "./StudentNavBar";

export default function ViewSession() {
  //getting the session details for the assign session cards
  const [sessionDetails, setSessionDetails] = useState([]);

  const getSessions = async () => {
    const sessionResponse = await Axios.get(
      "http://localhost:3001/getStudentSessions",
      {
        params: { task_number: sessionStorage.getItem("StudentWeekNumber") },
      }
    );
    if (sessionResponse.data.length > 0) {
      setSessionDetails(sessionResponse.data);
    } else {
      setSessionDetails(["No Data"]);
    }

    console.log(sessionResponse.data);
  };

  useEffect(() => {
    getSessions();
  }, []);

  return (
    <>
      <StudentSideBar />
      <StudentNavBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Sessions in Week</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Details</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex flex-row gap-5 flex-wrap">
          {sessionDetails.map((item) => {
            return (
              <StudentSessionCard
                session_number={item.SESSION_NUMBER}
                guide_id={item.GUIDE_ID}
                session_name={item.SESSION_NAME}
                session_description={item.SESSION_DESCRIPTION}
                date={item.DATE}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
