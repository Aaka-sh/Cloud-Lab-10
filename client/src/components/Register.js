import React, { useState } from "react";
import Axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Register() {
  let navigate = useNavigate();
  const [userRoleReg, setUserRoleReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [status, setStatus] = useState("");

  const register = () => {
    console.log(userRoleReg, usernameReg, passwordReg);

    Axios.post("http://localhost:3001/register", {
      userrole: userRoleReg,
      username: usernameReg,
      password: passwordReg,
    })
      .then((response) => {
        console.log(response);
        setStatus({ type: "success" });
      })
      .catch((error) => {
        setStatus({ type: "Error" });
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
                      href="index.html"
                      className="logo d-flex align-items-center w-auto"
                    >
                      <img src="assets/img/logo.png" alt="" />
                      <span className="d-none d-lg-block">Register</span>
                    </a>
                  </div>
                  {/* End Logo */}
                  <div className="card mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">
                          Create an Account
                        </h5>
                        <p className="text-center small">
                          Enter your personal details to create account
                        </p>
                      </div>
                      <form className="row g-3 needs-validation" noValidate>
                        <div>
                          Role:
                          <br />
                          <div className="form-check form-check-inline">
                            <br />
                            <input
                              class="form-check-input"
                              type="radio"
                              name="Roles"
                              value="Project Guide"
                              onChange={(e) => {
                                setUserRoleReg(e.target.value);
                                //console.log("Value: " + e.target.value);
                              }}
                            />
                            <label class="form-check-label" for="Role">
                              Project Guide
                            </label>
                          </div>
                          <div class="form-check form-check-inline">
                            <input
                              class="form-check-input"
                              type="radio"
                              name="Roles"
                              value="Student"
                              onChange={(e) => {
                                setUserRoleReg(e.target.value);
                                //console.log("Value: " + e.target.value);
                              }}
                            />
                            <label class="form-check-label" for="Role">
                              Student
                            </label>
                          </div>
                        </div>
                        <br />
                        <br />
                        <div className="col-12">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="G-1001"
                            onChange={(e) => {
                              setUsernameReg(e.target.value);
                            }}
                          />
                          <label className="form-label" for="Username">
                            Username
                          </label>
                          <div className="invalid-feedback">
                            Please, enter your username!
                          </div>
                        </div>

                        <div className="col-12">
                          <input
                            type="password"
                            id="form2Example2"
                            className="form-control"
                            onChange={(e) => {
                              setPasswordReg(e.target.value);
                            }}
                          />{" "}
                          <label className="form-label" for="Password">
                            Password
                          </label>
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn btn-primary w-100"
                            type="submit"
                            onClick={() => {
                              register();
                              navigate("/login");
                            }}
                          >
                            Create Account
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Already have an account? <a href="/Login">Log in</a>
                          </p>
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
