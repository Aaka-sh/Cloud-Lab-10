import React, { useEffect, useState } from "react";
import Axios from "axios";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import ProjectDiaryCard from "./ProjectDiaryCard";
import NameCards from "./NameCards";

export default function Evalution() {
  const [entryDetails, setEntryDetails] = useState([]);
  const [studentNames, setStudentNames] = useState([]);

  const getEntries = async () => {
    const entryResponse = await Axios.get(
      "http://localhost:3001/projectDiaryEntry"
    );
    setEntryDetails(entryResponse.data);
    console.log(entryResponse.data);
  };

  useEffect(() => {
    getEntries();
  }, []);

  const getNames = async () => {
    const nameResponse = await Axios.get(
      "http://localhost:3001/getStudentNames"
    );
    setStudentNames(nameResponse.data);
    console.log(nameResponse.data);
  };

  useEffect(() => {
    getNames();
  }, []);
  return (
    <div>
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="card-body">
          <div className="pagetitle">
            <h1>Evaluate Students</h1>
            <nav>
              <ol className="breadcrumb">
                <li className="breadcrumb-item">
                  <a href="/guidedashboard">Home</a>
                </li>

                <li className="breadcrumb-item active">Students</li>
              </ol>
            </nav>
          </div>
          <div className="d-flex flex-row gap-4 flex-wrap">
            {studentNames.map((item) => {
              return (
                <NameCards
                  student_id={item.Student_ID}
                  student_name={item.Student_Name}
                />
              );
            })}
          </div>
        </div>
      </main>
    </div>
  );
}
