import React from "react";

export default function DiaryEntryCard(props) {
  //console.log(props);
  return (
    <div className="card col-lg-5">
      <div className="card-body">
        <h5 className="card-title">Task Number: {props.tasknumber}</h5>

        <p className="card-text">
          <b>Session Number:</b> {props.sessionnumber}
        </p>

        <p className="card-text">
          <b>Work Planned:</b> {props.workplanned}
        </p>

        <p className="card-text">
          <b>Work Completed:</b> {props.workcompleted}
        </p>
        <table className="table">
          <tbody>
            <tr>
              <th scope="row"> Date</th>
              <td>{props.entrydate}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
