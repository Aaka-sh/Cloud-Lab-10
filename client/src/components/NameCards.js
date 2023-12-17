import React from "react";

export default function NameCard(props) {
  //console.log(props);
  return (
    <div className="card col-lg-3">
      <div className="card-body">
        <div className="card-body mt-3">
          <h5 className="card-title">
            {props.student_id}: {props.student_name}
          </h5>
        </div>
        <div className="text-center">
          <a
            href="/evaluatestudent"
            className="btn w-100 mt-1"
            style={{ backgroundColor: "#012970", color: "white" }}
            onClick={() => {
              sessionStorage.setItem("StudentCardID", props.student_id);
            }}
          >
            Evaluate
          </a>
        </div>
      </div>
    </div>
  );
}
