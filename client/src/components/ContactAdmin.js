import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import React, { useState } from "react";
import Axios from "axios";
import { getMessage } from "@testing-library/jest-dom/dist/utils";

export default function ContactAdmin() {
  const [userName, setUserName] = useState("");
  const [issueTitle, setIssueTitle] = useState("");
  const [desCription, setDescription] = useState("");

  const addMessage = (event) => {
    event.preventDefault();
    console.log(userName, issueTitle, desCription);

    Axios.post("http://localhost:3001/addmessage", {
      Name: userName,
      Issue: issueTitle,
      Description: desCription,
    });
  };

  return (
    <>
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Contact Admin</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/guidedashboard">Home</a>
              </li>

              <li className="breadcrumb-item active">Contact Admin</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}

        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card w-75">
                <div className="card-body pt-3">
                  <h3>Raise an Issue</h3>
                  <br />

                  {/* Profile Edit Form */}
                  <form>
                    <div className="row mb-3">
                      <label className="col-md-4 col-lg-3 col-form-label">
                        UserName
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          onChange={(e) => {
                            setUserName(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-md-4 col-lg-3 col-form-label">
                        Issue Title
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <input
                          type="text"
                          className="form-control"
                          defaultValue=""
                          onChange={(e) => {
                            setIssueTitle(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <label className="col-md-4 col-lg-3 col-form-label">
                        Describe the Issue
                      </label>
                      <div className="col-md-8 col-lg-9">
                        <textarea
                          className="form-control"
                          style={{ height: "100px" }}
                          defaultValue=""
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                        />
                      </div>
                    </div>

                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn"
                        style={{
                          backgroundColor: "#012971",
                          color: "white",
                        }}
                        onClick={(e) => {
                          addMessage(e);
                        }}
                      >
                        Submit
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
    </>
  );
}
