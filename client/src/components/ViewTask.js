import React, { useState, useEffect } from "react";
import Axios from "axios";
import TaskCards from "./TaskCards";
import StudentSideBar from "./StudentSideBar";
import StudentNavBar from "./StudentNavBar";

export default function ViewTask() {
  const [taskDetails, setTaskDetails] = useState([]);

  const getTasks = async () => {
    const taskResponse = await Axios.get("http://localhost:3001/getTasks");
    setTaskDetails(taskResponse.data);
    console.log(taskResponse.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      <StudentSideBar />
      <StudentNavBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Assigned Tasks</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Details</li>
            </ol>
          </nav>
        </div>
        <div className="d-flex flex-row gap-5 flex-wrap">
          {/* End Page Title */}
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
