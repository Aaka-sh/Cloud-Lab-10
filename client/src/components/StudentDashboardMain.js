import React, { useState, useEffect } from "react";
import Axios from "axios";
import TaskCards from "./TaskCards";
import GuideCard from "./GuideCard";

export default function StudentDashboardMain() {
  const [taskDetails, setTaskDetails] = useState([]);
  const [guideDetails, setGuideDetails] = useState([]);

  const getTasks = async () => {
    const taskResponse = await Axios.get("http://localhost:3001/getTasks");
    setTaskDetails(taskResponse.data);
    //console.log(taskResponse.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getGuideForStudent = async () => {
    const guideResponse = await Axios.get(
      "http://localhost:3001/guideforstudent"
    );
    setGuideDetails(guideResponse.data);

    console.log(guideResponse.data);
  };

  useEffect(() => {
    getGuideForStudent();
  }, []);

  return (
    <>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Your Guide</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Details</li>
            </ol>
          </nav>
        </div>

        {/* End Page Title */}
        <div className="d-flex flex-row gap-4 flex-wrap">
          {guideDetails.map((item) => {
            return (
              <GuideCard
                guide_id={item.Guide_ID}
                guide_name={item.Guide_Name}
                guide_about={item.Guide_About}
                department={item.Department}
                guide_phone={item.Guide_Phone}
                guide_email={item.Guide_Email}
                guide_github={item.Guide_Github}
              />
            );
          })}
        </div>

        <div className="pagetitle">
          <h1>Tasks</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Details</li>
            </ol>
          </nav>
        </div>

        {/* End Page Title */}
        <div className="d-flex flex-row gap-4 flex-wrap">
          {taskDetails.map((item) => {
            return (
              <TaskCards
                task_number={item.task_number}
                guide_id={item.guide_id}
                task_name={item.task_name}
                task_description={item.task_description}
                start_date={item.start_date}
                end_date={item.end_date}
              />
            );
          })}
        </div>
      </main>
    </>
  );
}
