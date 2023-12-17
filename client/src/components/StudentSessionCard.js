import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function StudentSessionCard(props) {
  const [feedbackDetails, setFeedbackDetails] = useState([]);
  const getFeedback = async () => {
    const feedbackResponse = await Axios.get(
      "http://localhost:3001/getFeedback",
      {
        params: {
          week_number: sessionStorage.getItem("StudentWeekNumber"),
          session_number: props.session_number,
          student: sessionStorage.getItem("studentName"),
        },
      }
    );
    setFeedbackDetails(feedbackResponse.data);
    console.log(feedbackResponse.data);
  };

  useEffect(() => {
    getFeedback();
  }, []);

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

        {feedbackDetails.map((item) => {
          return (
            <div>
              <p>
                <b>Feedback: </b>
                {item.feedback}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
