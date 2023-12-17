import React from "react";

export default function WeekCard(props) {
  return (
    <div className="card col-lg-3">
      <div className="card-body">
        <div className="card-body mt-3">
          <h5 className="card-title">Week Number: {props.week_number}</h5>
        </div>

        <div className="text-center">
          <a
            href="/viewdiaryentries"
            className="btn w-100 mt-2"
            style={{ backgroundColor: "#012970", color: "white" }}
            onClick={() => {
              sessionStorage.setItem("GuideWeekNumber", props.week_number);
            }}
          >
            View Progress
          </a>
        </div>
      </div>
    </div>
  );
}
