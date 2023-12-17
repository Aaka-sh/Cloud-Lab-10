import React from "react";

export default function SessionCard(props) {
  return (
    <div className="card col-lg-5">
      <div className="card-body">
        <h5 className="card-title">
          Session Number: {props.session_number} - {props.session_name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Guide ID: {props.guide_id}
        </h6>
        <p className="card-text">
          <b>Description:</b> {props.session_description}
        </p>

        <table className="table">
          <tbody>
            <tr>
              <th scope="row"> Date</th>
              <td>{props.date}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
