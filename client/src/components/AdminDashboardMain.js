import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboardMain() {
  //Navigator
  const nav = useNavigate();

  const [aData, setAData] = useState([]);
  const [mData, setMData] = useState([]);

  //Open Message Response Page
  function openResp(id) {
    nav(`/adminmessage/${id}`);
  }

  const getAdminDetails = async () => {
    const adminResponse = await Axios.get("http://localhost:3001/getadmindata");
    setAData(adminResponse.data);
    console.log(adminResponse.data);
  };

  useEffect(() => {
    getAdminDetails();
  }, []);

  const getMessages = async () => {
    const messageResponse = await Axios.get("http://localhost:3001/getmessage");
    setMData(messageResponse.data);
    console.log(messageResponse.data);
  };

  useEffect(() => {
    getMessages();
  }, []);

  // useEffect(() => {
  //   axios.get("http://localhost:3001/getadmindata").then((res) => {
  //     setAData(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(aData);
  // }, [aData]);

  // useEffect(() => {
  //   Axios.get("http://localhost:3001/getmessage").then((res) => {
  //     setMData(res.data);
  //   });
  // }, []);

  // useEffect(() => {
  //   console.log(mData);
  // }, [mData]);

  return (
    <>
      <main id="main" className="main">
        {aData.map((value, index) => {
          return <h3>Hello, {value.USERNAME}</h3>;
        })}

        <div className="tab-content pt-2" id="guideTab">
          <div className="card w-50">
            <div className="card-body">
              <h5 className="card-title">Messages </h5>
              {/* Default Table */}
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Message</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {mData.map((value, index) => {
                    return (
                      <tr>
                        <td>{value.Name}</td>
                        <td>{value.Issue}</td>
                        <td>
                          <button
                            className="btn btn-light rounded-pill"
                            onClick={() => openResp(value.Name)}
                          >
                            Open
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
      </main>
    </>
  );
}
