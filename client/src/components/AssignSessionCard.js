import React from "react";

export default function AssignSessionCard(props) {
  return (
    <div className="card col-lg-5">
      <div className="card-body">
        <h5 className="card-title">
          Week Number: {props.task_number} - {props.task_name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Guide ID: {props.guide_id}
        </h6>
        <p className="card-text">
          <b>Description:</b> {props.task_description}
        </p>

        <table className="table">
          <tbody>
            <tr>
              <th scope="row">Start Date</th>
              <td>{props.start_date}</td>
            </tr>
            <tr>
              <th scope="row">End Date</th>
              <td>{props.end_date}</td>
            </tr>
          </tbody>
        </table>
        <div className="text-center">
          <a
            href="/addsession"
            className="btn w-100"
            style={{ backgroundColor: "#012970", color: "white" }}
            onClick={() => {
              sessionStorage.setItem("WeekNumber", props.task_number);
            }}
          >
            Add Session
          </a>
        </div>
      </div>
    </div>
  );
}
