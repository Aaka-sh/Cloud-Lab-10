import React, { useEffect, useState } from "react";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import SessionCard from "./SessionCard";
import Axios from "axios";

export default function AddSession() {
  //session storage to identify the week number
  const [sessionNumber, setSessionNumber] = useState("");
  const [sessionName, setSessionName] = useState("");
  const [sessionDescription, setSessionDescription] = useState("");
  const [sessionDate, setSessionDate] = useState("");
  const [status, setStatus] = useState("");

  //getting the session details for the assign session cards
  const [sessionDetails, setSessionDetails] = useState([]);

  const getSessions = async () => {
    const sessionResponse = await Axios.get(
      "http://localhost:3001/getSessions",
      {
        params: { task_number: sessionStorage.getItem("WeekNumber") },
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

  const addSession = (event) => {
    event.preventDefault();
    //console.log("Hello");
    console.log(sessionNumber, sessionName, sessionDescription, sessionDate);

    Axios.post("http://localhost:3001/guide/addsession", {
      session_number: sessionNumber,
      //retreiving the week number from session storage
      task_number: sessionStorage.getItem("WeekNumber"),
      session_name: sessionName,
      session_description: sessionDescription,
      date: sessionDate,
    })
      .then((response) => {
        //console.log(response);
        setStatus({ type: "success" });
        getSessions();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  return (
    <div className="ml-5">
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Add Session</h1>
        </div>
        {/* End Page Title */}

        <section className="section profile">
          <div className="row">
            <div className="col-xl-11">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Profile Edit Form */}
                  <form className="p-5">
                    <div className="row mb-3">
                      <label
                        htmlFor="session_number"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Session Number
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="teamNumber"
                          type="text"
                          className="form-control"
                          id="teamNumber"
                          defaultValue=""
                          onChange={(e) => {
                            setSessionNumber(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="teamID"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Session Name
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="taskName"
                          type="text"
                          className="form-control"
                          id="taskname"
                          defaultValue=""
                          onChange={(e) => {
                            setSessionName(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="taskDescription"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Session Description
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <textarea
                          name="sessionDescription"
                          className="form-control"
                          id="sessionDescription"
                          style={{ height: "100px" }}
                          defaultValue={""}
                          onChange={(e) => {
                            setSessionDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="startDate"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Date
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="Date"
                          type="date"
                          className="form-control"
                          id="Date"
                          defaultValue=""
                          onChange={(e) => {
                            setSessionDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn col-md-6"
                        style={{ backgroundColor: "#012971", color: "white" }}
                        onClick={(e) => {
                          addSession(e);
                        }}
                      >
                        Add Session
                      </button>
                    </div>
                  </form>
                  {/* End Profile Edit Form */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pagetitle">
          <h1>Sessions in Week </h1>
        </div>
        <div className="d-flex flex-row gap-5 flex-wrap">
          {sessionDetails.map((item) => {
            return (
              <SessionCard
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
    </div>
  );
}
