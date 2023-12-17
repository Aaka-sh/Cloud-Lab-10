import Axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

export default function StudentNavBar() {
  const navigate = useNavigate();
  const [studentUserDetails, setStudentUserDetails] = useState([]);
  const [studentDetails, setStudentDetails] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/guide-auth").then((res) => {
      if (res.data !== "success") {
        navigate("/login");
      }
    });
  }, []);

  const getStudentData = async () => {
    const studentDataResponse = await Axios.get(
      "http://localhost:3001/student/data"
    );
    setStudentDetails(studentDataResponse.data);
    console.log(studentDetails);
    //console.log(studentDetails);
  };

  useEffect(() => {
    getStudentData();
  }, []);

  const logout = () => {
    sessionStorage.clear();
    Axios.get("http://localhost:3001/logout").then((res) => {
      if (res.data === "success") {
        navigate("/login");
      }
    });
  };

  const loadData = () => {
    Axios.get("http://localhost:3001/student/userdata", {}).then((response) => {
      setStudentUserDetails(response.data);
      console.log(studentUserDetails);
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const supabase = createClient(
    "https://bucxmapgbqvszyijxeav.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Y3htYXBnYnF2c3p5aWp4ZWF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTk5NDExNSwiZXhwIjoxOTk1NTcwMTE1fQ.frpT81qIffE-2x1u0Mh-5q9p0ApL5HKlFnzIKIiCVJI"
  );

  const { data, error } = supabase.storage
    .from("userimages")
    .getPublicUrl("public/" + sessionStorage.studentName + ".png");
  console.log(data.publicUrl);

  return (
    <header id="header" className="header fixed-top d-flex align-items-center">
      <div className="d-flex align-items-center justify-content-between">
        <a href="index.html" className="logo d-flex align-items-center">
          <img src="assets/img/logo.png" alt="" />
          <span className="d-none d-lg-block">TeamTrackr</span>
        </a>
      </div>
      {/* End Logo */}

      {/* End Search Bar */}
      <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
          {/* End Messages Nav */}
          <li className="nav-item dropdown pe-3">
            <a
              className="nav-link nav-profile d-flex align-items-center pe-0"
              href="#"
              data-bs-toggle="dropdown"
            >
              <img
                src={data.publicUrl}
                alt="Profile"
                className="rounded-circle"
              />

              {studentUserDetails.map((item, index) => {
                return (
                  <span className="d-none d-md-block dropdown-toggle ps-2">
                    {item.username}
                  </span>
                );
              })}
            </a>
            {/* End Profile Iamge Icon */}
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
              <li className="dropdown-header">
                {studentDetails.map((item) => {
                  return <h6>{item.Student_Name}</h6>;
                })}

                {studentUserDetails.map((item, index) => {
                  return <span>{item.userrole}</span>;
                })}
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  href="studentuserprofile"
                >
                  <i className="bi bi-person" />
                  <span>My Profile</span>
                </a>
              </li>
              <li>
                <hr className="dropdown-divider" />
              </li>

              <li>
                <a
                  className="dropdown-item d-flex align-items-center"
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-right" />
                  <span>Sign Out</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </header>
  );
}
