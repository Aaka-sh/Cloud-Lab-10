import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import GuideDashboard from "./components/GuideDashboard";
import GuideUserProfile from "./components/GuideUserProfile";
import StudentDashboard from "./components/StudentDashboard";
import StudentUserProfile from "./components/StudentUserProfile";
import AddTeam from "./components/AddTeam";
import AddTask from "./components/AddTask";
import Evalution from "./components/Evaluation";
import ViewTask from "./components/ViewTask";
import AddSession from "./components/AddSession";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProjectDiary from "./components/ProjectDiary";
import ViewSession from "./components/ViewSession";
import ViewProgress from "./components/ViewProgress";
import Submissions from "./components/Submissions";
import EvaluationForm from "./components/EvaluationForm";
import ViewDiaryEntries from "./components/ViewDiaryEntries";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import AdminManageUser from "./components/AdminManageUser";
import ContactAdmin from "./components/ContactAdmin";
import AdminMessages from "./components/AdminMessages";

export default function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/guidedashboard" element={<GuideDashboard />} />
          <Route path="/guideuserprofile" element={<GuideUserProfile />} />
          <Route path="/studentdashboard" element={<StudentDashboard />} />
          <Route path="/studentuserprofile" element={<StudentUserProfile />} />
          <Route path="/addteam" element={<AddTeam />} />
          <Route path="/addtask" element={<AddTask />} />
          <Route path="/evaluation" element={<Evalution />} />
          <Route path="/viewtask" element={<ViewTask />} />
          <Route path="/addsession" element={<AddSession />} />
          <Route path="/projectdiary" element={<ProjectDiary />} />
          <Route path="/viewsession" element={<ViewSession />} />
          <Route path="/viewprogress" element={<ViewProgress />} />
          <Route path="/viewsubmissions" element={<Submissions />} />
          <Route path="/evaluatestudent" element={<EvaluationForm />} />
          <Route path="/viewdiaryentries" element={<ViewDiaryEntries />} />
          <Route path="/contactadmin" element={<ContactAdmin />} />
          <Route path="/adminmanageuser" element={<AdminManageUser />} />
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminmessage/:id" element={<AdminMessages />} />
        </Routes>
      </Router>
    </>
  );
}
