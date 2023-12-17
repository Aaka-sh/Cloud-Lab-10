import React, { useState } from "react";
import Axios from "axios";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  const [userrole, setUserrole] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginStatus, setLoginStatus] = useState("");

  const login = () => {
    Axios.post("http://localhost:3001/login", {
      userrole: userrole,
      username: username,
      password: password,
    }).then((response) => {
      console.log(response);
      if (response.data[0].userrole == "Project Guide") {
        navigate("/guidedashboard");
        sessionStorage.guideName = response.data[0].username;
      } else if (response.data[0].userrole == "Student") {
        navigate("/studentdashboard");
        sessionStorage.studentName = response.data[0].username;
      } else if (response.data === "IncorrectPassword") {
        const error = document.getElementById("error");
        error.innerHTML =
          "<span style='color: red'>Error: Incorrect Password</span>";
        console.log("Incorrect Password");
      } else {
        const error = document.getElementById("error");
        error.innerHTML =
          "<span style='color: red'>Error: Incorrect Username</span>";

        console.log("Incorrect Username");
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
                      href="index.html"
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
                          Login to Your Account
                        </h5>
                        <p className="text-center small">
                          Enter your username &amp; password to login
                        </p>
                      </div>
                      <form className="row g-3 needs-validation" noValidate>
                        <div className="col-12">
                          <label htmlFor="yourUsername" className="form-label">
                            Username
                          </label>
                          <div className="input-group has-validation">
                            <input
                              type="text"
                              name="username"
                              className="form-control"
                              id="yourUsername"
                              placeholder="G-1001/S-1001"
                              required
                              onChange={(e) => setUsername(e.target.value)}
                            />
                            <div className="invalid-feedback">
                              Please enter your username.
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <label htmlFor="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <div className="mt-3 w-100">
                            <p id="error"></p>
                          </div>
                          <div className="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        <div className="col-12">
                          <button
                            className="btn w-100 mt-3"
                            type="button"
                            style={{
                              backgroundColor: "#012970",
                              color: "white",
                            }}
                            onClick={() => {
                              login();
                            }}
                          >
                            Login
                          </button>
                        </div>
                        <div className="col-12">
                          <p className="small mb-0">
                            Don't have account?{" "}
                            <a href="/register">Create an account</a>
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
      {/* End #main */}
      {/* <div className="middle--block">
        <div className="form--divison">
          <h2 className="form--division--register">Login</h2>
          <form>
            <div className="form-outline mb-4">
              <input
                type="text"
                className="form-control"
                placeholder="G-1001"
                id="log"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />{" "}
              <label className="form-label" for="form2Example1">
                Username
              </label>
            </div>

            <div className="form-outline mb-4">
              <input
                type="password"
                className="form-control"
                id="pass1"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              <label className="form-label" for="form2Example2">
                Password
              </label>
            </div>

            <div className="row mb-4">
              <div className="col d-flex justify-content-center">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value=""
                    id="form2Example31"
                    checked
                  />
                  <label className="form-check-label" for="form2Example31">
                    {" "}
                    Remember me{" "}
                  </label>
                </div>
              </div>

              <div className="col">
                <a href="#!">Forgot password?</a>
              </div>
            </div>

            <button
              type="button"
              onClick={login}
              className="btn btn-primary btn-block mb-4"
            >
              Sign in
            </button>
            <h1> {login}</h1>
            <div className="text-center">
              <p>
                Not a member? <a href="#!">Register</a>
              </p>
            </div>
          </form>
        </div>
      </div> */}
    </div>
  );
}
