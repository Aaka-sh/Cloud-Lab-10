import React, { useState, useEffect } from "react";
import Axios from "axios";

export default function GuideSideBar() {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a className="nav-link " href="/guidedashboard">
            <i className="bi bi-grid" />
            <span>Dashboard</span>
          </a>
        </li>
        {/* End Dashboard Nav */}

        <li className="nav-item">
          <a className="nav-link collapsed" href="/guideuserprofile">
            <i className="bi bi-person" />
            <span>Profile</span>
          </a>
        </li>
        {/* End Profile Page Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="/addteam">
            <i className="bi bi-person-add" />
            <span>Add Team</span>
          </a>
        </li>
        {/* End Add Team Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="/addtask">
            <i className="bi bi-list-task" />
            <span>Add Weekly Task</span>
          </a>
        </li>
        {/* End Add Tasks Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="/viewprogress">
            <i className="bi bi-graph-up-arrow" />
            <span>View Progress</span>
          </a>
        </li>
        {/* End Evaluation Nav */}
        <li className="nav-item">
          <a className="nav-link collapsed" href="/evaluation">
            <i className="bi bi-calculator" />
            <span>Evaluation</span>
          </a>
        </li>

        <li className="nav-item">
          <a className="nav-link collapsed" href="/contactadmin">
            <i className="bi bi-calculator" />
            <span>Contact Admin</span>
          </a>
        </li>
        {/* End Evaluation Nav */}
      </ul>
    </aside>
  );
}
