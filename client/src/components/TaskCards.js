import React from "react";
import { createClient } from "@supabase/supabase-js";

export default function TaskCards(props) {
  const supabase = createClient(
    "https://bucxmapgbqvszyijxeav.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Y3htYXBnYnF2c3p5aWp4ZWF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTk5NDExNSwiZXhwIjoxOTk1NTcwMTE1fQ.frpT81qIffE-2x1u0Mh-5q9p0ApL5HKlFnzIKIiCVJI"
  );
  //supabase upload function
  async function upload(event) {
    const avatarFile = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("userimages")
      .upload(
        "public/" +
          sessionStorage.getItem("studentName") +
          "_" +
          props.task_number +
          ".pdf",
        avatarFile,
        {
          cacheControl: "3600",
          upsert: true,
        }
      );
    console.log("hello");
  }

  return (
    <div className="card col-lg-5">
      <div className="card-body">
        <h5 className="card-title">
          Task Number: {props.task_number} - {props.task_name}
        </h5>
        <h6 className="card-subtitle mb-2 text-muted">
          Guide ID: {props.guide_id}
        </h6>
        <p className="card-text">
          <b>Description:</b> {props.task_description}
        </p>
        <b>
          <p>Dates:</p>
        </b>
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
          Upload File:
          <input
            type="file"
            className="btn w-100"
            style={{
              color: "black",
            }}
            onChange={(e) => {
              upload(e);
            }}
          />
        </div>

        <div className="text-center">
          <a
            href="/viewsession"
            className="btn w-100 mt-3"
            style={{ backgroundColor: "#012970", color: "white" }}
            onClick={() => {
              sessionStorage.setItem("StudentWeekNumber", props.task_number);
            }}
          >
            View Session
          </a>
        </div>
      </div>
    </div>
  );
}
