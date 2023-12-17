import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function AdminMessages() {
  let id = useParams();
  console.log(id.id);

  const [mData, setMData] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/getmessage-des?id=${id.id}`)
      .then((res) => {
        setMData(res.data);
      });
  }, []);

  useEffect(() => {
    console.log(mData);
  }, [mData]);

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <main id="main" className="main">
        <div className="card-body ml-5">
          <div className="pagetitle">
            <h1>Send Response</h1>
          </div>
        </div>
        <div className="card w-80 ml-5 p-3">
          <div className="card-body d-flex flex-column pt-5 gap-4">
            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Name</div>
              <div className="col-lg-9 col-md-8">
                {mData.map((item) => {
                  return <>{item.Name}</>;
                })}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Issue</div>
              <div className="col-lg-9 col-md-8">
                {mData.map((item) => {
                  return <>{item.Issue}</>;
                })}
              </div>
            </div>

            <div className="row">
              <div className="col-lg-3 col-md-4 label ">Description</div>
              <div className="col-lg-9 col-md-8">
                {mData.map((item) => {
                  return <>{item.Description}</>;
                })}
              </div>
            </div>

            <div className="row">
              <label
                htmlFor="about"
                className="col-md-4 col-lg-3 col-form-label"
              >
                Response
              </label>
              <div className="col-md-8 col-lg-9">
                <textarea
                  name="about"
                  className="form-control"
                  id="about"
                  style={{ height: "100px" }}
                  defaultValue=""
                  // onChange={(e) => {
                  //     setGuideAbout(e.target.value);
                  // }}
                />
              </div>
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="btn w-50"
                style={{
                  backgroundColor: "#012971",
                  color: "white",
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
