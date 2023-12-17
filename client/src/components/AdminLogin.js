import Navbar from "./Navbar";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function AdminLogin() {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const adminlogin = () => {
    Axios.post("http://localhost:3001/adminlogin", {
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data === "IncorrectPassword") {
        console.log("Incorrect password");
      } else if (response.data === "Invalid Username") {
        console.log("Incorrect Username");
      } else {
        navigate("/AdminDashboard");
      }
    });
  };

  return (
    <div>
      <Navbar />
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                    <a
                      href="#"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">TeamTrackr</span>
                    </a>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Admin Login
                        </h5>
                      </div>
                      <form className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                          {/*<label htmlFor="yourUsername" className="form-label">*/}
                          {/*    Username*/}
                          {/*</label>*/}
                          <div className="input-group has-validation">
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              id="yourUsername"
                              placeholder="Username"
                              required
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              Please enter your username.
                            </div>
                          </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="col-12">
                          {/*<label htmlFor="yourPassword" className="form-label">*/}
                          {/*    Password*/}
                          {/*</label>*/}
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            placeholder="Password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>
                        <br />
                        <br />
                        <br />
                        <div className="col-12">
                          <button
                            className="btn w-100"
                            type="button"
                            style={{
                              backgroundColor: "#012970",
                              color: "white",
                            }}
                            onClick={() => {
                              adminlogin();
                            }}
                          >
                            Login
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
