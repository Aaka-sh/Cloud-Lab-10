import React, { useState, useEffect } from "react";
import Axios from "axios";
import TeamCards from "./TeamCards";

export default function GuideDashboardMain() {
  const [teamDetails, setTeamDetails] = useState([]);

  const getTeams = async () => {
    const teamResponse = await Axios.get("http://localhost:3001/getTeams");
    setTeamDetails(teamResponse.data);
  };

  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div>
      <main id="main" className="main">
        <div className="pagetitle">
          <h1>My Teams</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">Details</li>
            </ol>
          </nav>
        </div>

        {/* End Page Title */}
        <div className="d-flex flex-row gap-4 flex-wrap">
          {teamDetails.map((item) => {
            return (
              <TeamCards
                guide_id={item.Guide_ID}
                team_id={item.Team_ID}
                project_name={item.Project_name}
                project_description={item.Project_Description}
                member1={item.Member1}
                member2={item.Member2}
                member3={item.Member3}
              />
            );
          })}
        </div>
      </main>
    </div>
  );
}
