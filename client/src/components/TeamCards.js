import React from "react";

export default function TeamCards(props) {
  return (
    <div className="card col-lg-5">
      <div className="card-body">
        <h5 className="card-title">
          Team {props.team_id} - {props.project_name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Guide ID: {props.guide_id}
        </h6>
        <p className="card-text">
          <b>Description:</b> {props.project_description}
        </p>
        <b>
          <p>Members:</p>
        </b>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">1</th>
              <td>{props.member1}</td>
            </tr>
            <tr>
              <th scope="row">2</th>
              <td>{props.member2}</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td>{props.member3}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
