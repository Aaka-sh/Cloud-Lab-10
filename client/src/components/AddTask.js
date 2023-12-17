import React, { useState, useEffect } from "react";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import AssignSessionCard from "./AssignSessionCard";
import Axios from "axios";

export default function AddTask() {
  const [taskNumber, setTaskNumber] = useState("");
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  //getting the task details for the assign session cards
  const [taskDetails, setTaskDetails] = useState([]);

  const getTasks = async () => {
    const taskResponse = await Axios.get("http://localhost:3001/getTasks");
    setTaskDetails(taskResponse.data);
    console.log(taskResponse.data);
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addTask = (event) => {
    event.preventDefault();
    //console.log("Hello");
    console.log(
      taskNumber,
      taskName,
      taskDescription,
      startDate,
      endDate
      //taskStatus
    );

    Axios.post("http://localhost:3001/guide/addtask", {
      task_number: taskNumber,
      task_name: taskName,
      task_description: taskDescription,
      start_date: startDate,
      end_date: endDate,
    })
      .then((response) => {
        //console.log(response);
        setStatus({ type: "success" });
        getTasks();
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
          <h1>Add Tasks</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/guidedashboard">Home</a>
              </li>

              <li className="breadcrumb-item active">Add Tasks</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}

        <section className="section profile">
          <div className="row">
            <div className="col-xl-11">
              <div className="card">
                <div className="card-body pt-5 pb-5">
                  <form className="pl-5">
                    <div className="row mb-3">
                      <label
                        htmlFor="guide_id"
                        className="col-md-4 col-lg-2 col-form-label"
                      >
                        Task Number
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="teamNumber"
                          type="text"
                          className="form-control"
                          id="teamNumber"
                          defaultValue=""
                          onChange={(e) => {
                            setTaskNumber(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="teamID"
                        className="col-md-4 col-lg-2 col-form-label"
                      >
                        Task Name
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="taskName"
                          type="text"
                          className="form-control"
                          id="taskname"
                          defaultValue=""
                          onChange={(e) => {
                            setTaskName(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="taskDescription"
                        className="col-md-4 col-lg-2 col-form-label"
                      >
                        Task description
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <textarea
                          name="taskDescription"
                          className="form-control"
                          id="taskDescription"
                          style={{ height: "100px" }}
                          defaultValue={""}
                          onChange={(e) => {
                            setTaskDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="startDate"
                        className="col-md-4 col-lg-2 col-form-label"
                      >
                        Start Date
                      </label>
                      <div className="col-md-6 col-lg-3">
                        <input
                          name="startDate"
                          type="date"
                          className="form-control"
                          id="startDate"
                          defaultValue=""
                          onChange={(e) => {
                            setStartDate(e.target.value);
                          }}
                        />
                      </div>

                      <label
                        htmlFor="endDate"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        End Date
                      </label>
                      <div className="col-md-8 col-lg-3">
                        <input
                          name="endDate"
                          type="date"
                          className="form-control"
                          id="endDate"
                          defaultValue=""
                          onChange={(e) => {
                            setEndDate(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3"></div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn col-lg-8 mt-4"
                        style={{ backgroundColor: "#012971", color: "white" }}
                        onClick={(e) => {
                          addTask(e);
                        }}
                      >
                        Add Task
                      </button>
                    </div>
                  </form>
                  {/* End Profile Edit Form */}
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="pagetitle mt-4">
          <h1>Assigned Tasks</h1>
        </div>
        <div className="d-flex flex-row gap-5 flex-wrap">
          {taskDetails.map((item) => {
            return (
              <AssignSessionCard
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
    </div>
  );
}
