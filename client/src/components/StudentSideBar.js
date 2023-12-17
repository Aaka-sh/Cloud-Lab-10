import React from "react";

export default function StudentSideBar() {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link " href="/studentdashboard">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </a>
          </li>
          {/* End Dashboard Nav */}

          <li className="nav-item">
            <a className="nav-link collapsed" href="/studentuserprofile">
              <i className="bi bi-person" />
              <span>Profile</span>
            </a>
          </li>
          {/* End Profile Page Nav */}

          <li className="nav-item">
            <a className="nav-link collapsed" href="/viewtask">
              <i className="bi bi-list-task" />
              <span>View Tasks</span>
            </a>
          </li>
          {/* End Add Tasks Nav */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/projectdiary">
              <i className="bi bi-journal" />
              <span>Project Diary</span>
            </a>
          </li>
          {/* End Evaluation Nav */}
        </ul>
      </aside>
    </>
  );
}
