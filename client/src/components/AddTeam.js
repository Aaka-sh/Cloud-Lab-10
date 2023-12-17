import React, { useState } from "react";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import Axios from "axios";

export default function AddTeam() {
  const [guideID, setGuideID] = useState("");
  const [teamNumber, setTeamNumber] = useState("");
  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [member1, setMember1] = useState("");
  const [member2, setMember2] = useState("");
  const [member3, setMember3] = useState("");
  const [status, setStatus] = useState("");

  const addTeam = (event) => {
    event.preventDefault();
    console.log("Hello");
    console.log(
      guideID,
      teamNumber,
      projectName,
      projectDescription,
      member1,
      member2,
      member3
    );

    Axios.post("http://localhost:3001/guide/addTeam", {
      team_number: teamNumber,
      project_name: projectName,
      project_description: projectDescription,
      member1: member1,
      member2: member2,
      member3: member3,
    })
      .then((response) => {
        //console.log(response);
        setStatus({ type: "success" });
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  return (
    <div className="ml-5">
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Add Team</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/guidedashboard">Home</a>
              </li>

              <li className="breadcrumb-item active">Add Teams</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}

        <section className="section profile">
          <div className="row">
            <div className="col-xl-11">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Profile Edit Form */}
                  <form className="pl-5 pr-5 pt-3 pb-3">
                    <div className="row mb-3">
                      <label
                        htmlFor="guide_id"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Guide ID
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="teamNumber"
                          type="text"
                          className="form-control"
                          id="teamNumber"
                          defaultValue=""
                          onChange={(e) => {
                            setGuideID(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="teamNumber"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Team Number
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="teamNumber"
                          type="text"
                          className="form-control"
                          id="teamNumber"
                          defaultValue=""
                          onChange={(e) => {
                            setTeamNumber(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="projectName"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Project Name
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="projectName"
                          type="text"
                          className="form-control"
                          id="projectName"
                          defaultValue=""
                          onChange={(e) => {
                            setProjectName(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="projectDescription"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Project description
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <textarea
                          name="projectDescription"
                          className="form-control"
                          id="projectDescription"
                          style={{ height: "100px" }}
                          defaultValue={""}
                          onChange={(e) => {
                            setProjectDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="member1"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Member 1
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="member1"
                          type="text"
                          className="form-control"
                          id="member1"
                          defaultValue=""
                          onChange={(e) => {
                            setMember1(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="row mb-3">
                      <label
                        htmlFor="Member2"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Member 2
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="Member2"
                          type="text"
                          className="form-control"
                          id="Member2"
                          defaultValue=""
                          onChange={(e) => {
                            setMember2(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label
                        htmlFor="Member3"
                        className="col-md-4 col-lg-3 col-form-label"
                      >
                        Member 3
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          name="Member3"
                          type="text"
                          className="form-control"
                          id="Member3"
                          defaultValue=""
                          onChange={(e) => {
                            setMember3(e.target.value);
                          }}
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn col-md-8 mt-4"
                        style={{
                          backgroundColor: "#012971",
                          color: "white",
                        }}
                        onClick={(e) => {
                          addTeam(e);
                        }}
                      >
                        Add Team
                      </button>
                    </div>
                  </form>
                  {/* End Profile Edit Form */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
