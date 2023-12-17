import AdminNavbar from "./AdminNavbar";
import AdminSidebar from "./AdminSidebar";
import React, { useEffect, useState } from "react";
import Axios from "axios";

export default function AdminManageUser() {
  const [gData, setGData] = useState([]);

  const getGuideData = async () => {
    const guideResponse = await Axios.get("http://localhost:3001/getguidedata");
    setGData(guideResponse.data);
    console.log(guideResponse.data);
  };

  useEffect(() => {
    getGuideData();
  }, []);

  //   useEffect(() => {
  //     axios.get("http://localhost:3001/getguidedata").then((res) => {
  //       setGData(res.data);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     console.log(gData);
  //   }, [gData]);

  const [sData, setSData] = useState([]);

  const getStudentData = async () => {
    const studentResponse = await Axios.get(
      "http://localhost:3001/getstudentdata"
    );
    setSData(studentResponse.data);
    console.log(studentResponse.data);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  //   useEffect(() => {
  //     axios.get("http://localhost:3001/getstudentdata").then((res) => {
  //       setSData(res.data);
  //     });
  //   }, []);

  //   useEffect(() => {
  //     console.log(sData);
  //   }, [sData]);

  //Open Student
  function openStudent() {
    document.getElementById("studTab").classList.remove("d-none");
    document.getElementById("guideTab").classList.add("d-none");
  }

  function openGuide() {
    document.getElementById("studTab").classList.add("d-none");
    document.getElementById("guideTab").classList.remove("d-none");
  }

  return (
    <>
      <AdminNavbar />
      <AdminSidebar />
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>Manage Users</h1>
        </div>
        <div className="card-body pt-3">
          {/* Bordered Tabs */}
          <ul className="nav nav-tabs nav-tabs-bordered">
            <li className="nav-item">
              <button
                onClick={openGuide}
                className="nav-link active"
                data-bs-toggle="tab"
                data-bs-target="#guidetable"
              >
                Guides
              </button>
            </li>
            <li className="nav-item">
              <button
                onClick={openStudent}
                className="nav-link"
                data-bs-toggle="tab"
                data-bs-target="#studenttable"
              >
                Students
              </button>
            </li>
          </ul>
          <br />
          {/* End Bordered Tabs */}
          <div className="tab-content pt-2" id="guideTab">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Guide Table</h5>
                {/* Default Table */}
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Guide Name</th>
                      <th scope="col">Department</th>
                      <th scope="col">Guide ID</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {gData.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{value.Guide_Name}</td>
                          <td>{value.Department}</td>
                          <td>{value.Guide_ID}</td>
                          <td>Active</td>
                          <td>
                            <button className="btn btn-light rounded-pill">
                              Block
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* End Default Table Example */}
              </div>
            </div>
          </div>

          {/*Student Table*/}

          <div className="tab-content pt-2 d-none" id="studTab">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Student Table</h5>
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Student Name</th>
                      <th scope="col">Department</th>
                      <th scope="col">Student ID</th>
                      <th scope="col">Status</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sData.map((value, index) => {
                      return (
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{value.Student_Name}</td>
                          <td>{value.Department}</td>
                          <td>{value.Student_ID}</td>
                          <td>Active</td>
                          <td>
                            <button className="btn btn-light rounded-pill">
                              Block
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {/* End Default Table Example */}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
