import React from "react";

export default function AdminSidebar() {
  return (
    <>
      <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link " href="/admindashboard">
              <i className="bi bi-grid" />
              <span>Dashboard</span>
            </a>
          </li>

          {/* End Profile Page Nav */}
          <li className="nav-item">
            <a className="nav-link collapsed" href="/adminmanageuser">
              <i className="bi bi-person" />
              <span>Manage Users</span>
            </a>
          </li>
          {/* End Add Team Nav */}
        </ul>
      </aside>
    </>
  );
}
