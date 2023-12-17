import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import HomeMain from "./HomeMain";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HomeMain />
    </div>
  );
}
