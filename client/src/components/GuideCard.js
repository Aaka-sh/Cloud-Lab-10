import React from "react";

export default function GuideCard(props) {
  return (
    <div className="card col-lg-6">
      <div className="card-body">
        <h5 className="card-title">
          {props.guide_id} - {props.guide_name}
        </h5>
        <p className="card-text">
          <b>About:</b> {props.guide_about}
        </p>
        <p className="card-text">
          <b>Department:</b> {props.department}
        </p>
        <p className="card-text">
          <b>Phone Number:</b> {props.guide_phone}
        </p>

        <p className="card-text">
          <b>Email:</b> {props.guide_email}
        </p>
        <p className="card-text">
          <b>Github:</b> {props.guide_github}
        </p>
      </div>
    </div>
  );
}
