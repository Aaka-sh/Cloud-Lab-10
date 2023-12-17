import React, { useState } from "react";
import Axios from "axios";

export default function ProjectDiaryCard(props) {
  //console.log(props);
  const [weekNumber, setWeekNumber] = useState(props.task_number);
  const [sessionNumber, setSessionNumber] = useState(props.session_number);
  const [workPlanned, setWorkPlanned] = useState(props.work_planned);
  const [workCompleted, setWorkCompleted] = useState(props.work_completed);
  const [date, setDate] = useState(props.entry_date);
  const [feedback, setFeedback] = useState("");
  const [status, setStatus] = useState();

  const saveFeedback = (event) => {
    event.preventDefault();
    console.log("My Details:");
    console.log(
      weekNumber,
      sessionNumber,
      workPlanned,
      workCompleted,
      date,
      sessionStorage.getItem("StudentCardID"),
      feedback
    );

    Axios.post("http://localhost:3001/givefeedback", {
      week_number: weekNumber,
      session_number: sessionNumber,
      work_planned: workPlanned,
      work_completed: workCompleted,
      date: date,
      feedback: feedback,
      student_id: sessionStorage.getItem("StudentCardID"),
    })
      .then((response) => {
        //console.log(response);
        setStatus({ type: "success" });
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };
  return (
    <div className="card col-lg-5">
      <div className="card-body">
        <h5 className="card-title">Task Number: {props.task_number}</h5>

        <p className="card-text">
          <b>Session Number:</b> {props.session_number}
        </p>

        <p className="card-text">
          <b>Work Planned:</b> {props.work_planned}
        </p>

        <p className="card-text">
          <b>Work Completed:</b> {props.work_completed}
        </p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row"> Date</th>
              <td>{props.entry_date}</td>
            </tr>
          </tbody>
        </table>

        <p className="card-text">
          <b>Feedback</b>
        </p>
        <div className="col-md-8 col-lg-12">
          <textarea
            name="about"
            className="form-control"
            id="about"
            style={{ height: "100px" }}
            defaultValue=""
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
        </div>
        <div className="text-center">
          <a
            href="/viewsubmissions"
            className="btn w-100 mt-4"
            style={{ backgroundColor: "#012970", color: "white" }}
            onClick={(e) => {
              saveFeedback(e);
              sessionStorage.setItem("StudentCardID", props.student_id);
            }}
          >
            Submit Feedback
          </a>
        </div>
      </div>
    </div>
  );
}
