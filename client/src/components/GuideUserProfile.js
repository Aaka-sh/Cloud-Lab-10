import React, { useState, useEffect } from "react";
import Axios from "axios";
import AWS from "aws-sdk";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import { createClient } from "@supabase/supabase-js";

export default function GuideUserProfile() {
  const [guideUserDetails, setGuideUserDetails] = useState([]);
  const [guideDetails, setGuideDetails] = useState([]);

  const [guideName, setGuideName] = useState("");
  const [guideAbout, setGuideAbout] = useState("");
  const [guideDepartment, setGuideDepartment] = useState("");
  const [guidePhone, setGuidePhone] = useState("");
  const [guideEmail, setGuideEmail] = useState("");
  const [guideGithub, setGuideGithub] = useState("");
  const [status, setStatus] = useState("");
  const url =
    "https://2247206-bucket.s3.amazonaws.com/images/AkashGoyal_2247206.jpg";
  const supabase = createClient(
    "https://bucxmapgbqvszyijxeav.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ1Y3htYXBnYnF2c3p5aWp4ZWF2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY3OTk5NDExNSwiZXhwIjoxOTk1NTcwMTE1fQ.frpT81qIffE-2x1u0Mh-5q9p0ApL5HKlFnzIKIiCVJI"
  );

  // Create state to store file
  const [file, setFile] = useState(null);

  // Function to upload file to s3
  const uploadFile = async () => {
    // S3 Bucket Name
    const S3_BUCKET = "2247206-bucket";

    // S3 Region
    const REGION = "region";

    // S3 Credentials
    AWS.config.update({
      accessKeyId: "ASIARSVMXX6RQCOID45T",
      secretAccessKey: "6naQ79wkHihYBRjNtzwErrvjXafY+76iK2Az3O7q",
    });
    const s3 = new AWS.S3({
      params: { Bucket: S3_BUCKET },
      region: REGION,
    });

    // Files Parameters

    const params = {
      Bucket: S3_BUCKET,
      Key: file.name,
      Body: file,
    };

    // Uploading file to s3

    var upload = s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        // File uploading progress
        console.log(
          "Uploading " + parseInt((evt.loaded * 100) / evt.total) + "%"
        );
      })
      .promise();

    await upload.then((err, data) => {
      console.log(err);
      // Fille successfully uploaded
      alert("File uploaded successfully.");
    });
  };
  // Function to handle file and store it to file state
  const handleFileChange = (e) => {
    // Uploaded file
    const file = e.target.files[0];
    // Changing file state
    setFile(file);
  };
  const loadData = () => {
    Axios.get("http://localhost:3001/guide/userdata", {}).then((response) => {
      setGuideUserDetails(response.data);
      console.log(guideUserDetails);
    });
  };
  useEffect(() => {
    loadData();
  }, []);

  const getGuideData = async () => {
    const guideDataResponse = await Axios.get(
      "http://localhost:3001/guide/data"
    );
    setGuideDetails(guideDataResponse.data);
    setGuideName(guideDetails[0].Guide_Name);
    setGuideAbout(guideDetails[0].Guide_About);
    setGuideDepartment(guideDetails[0].Department);
    setGuidePhone(guideDetails[0].Guide_Phone);
    setGuideEmail(guideDetails[0].Guide_Email);
    setGuideGithub(guideDetails[0].Guide_Github);
    console.log("GuideName: " + guideName);
    console.log(guideDetails);
  };

  useEffect(() => {
    console.log(guideUserDetails);
    //sessionStorage.guideName = guideUserDetails[0].username;
    //
  }, []);

  useEffect(() => {
    getGuideData();
  }, []);

  const saveGuideDetails = (event) => {
    event.preventDefault();
    console.log("My Details:");
    console.log(
      guideName,
      guideAbout,
      guideDepartment,
      guidePhone,
      guideEmail,
      guideGithub
    );

    Axios.post("http://localhost:3001/saveGuideDetails", {
      guide_name: guideName,
      guide_about: guideAbout,
      department: guideDepartment,
      guide_phone: guidePhone,
      guide_email: guideEmail,
      guide_github: guideGithub,
    })
      .then((response) => {
        //console.log(response);
        setStatus({ type: "success" });
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  //supabase upload function
  async function upload(event) {
    console.log(guideUserDetails[0].username);
    const avatarFile = event.target.files[0];
    const { data, error } = await supabase.storage
      .from("userimages")
      .upload("public/" + guideUserDetails[0].username + ".png", avatarFile, {
        cacheControl: "3600",
        upsert: true,
      });
    console.log("hello");
  }
  const { data, error } = supabase.storage
    .from("userimages")
    .getPublicUrl("public/" + sessionStorage.guideName + ".png");
  console.log(data.publicUrl);

  return (
    <div>
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="container pagetitle">
          <h1>Profile</h1>
          <nav>
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="/guidedashboard">Home</a>
              </li>

              <li className="breadcrumb-item active">Profile</li>
            </ol>
          </nav>
        </div>
        {/* End Page Title */}

        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img src={url} alt="Profile" className="rounded-circle" />

                  {guideDetails.map((item) => {
                    return <h2>{item.Guide_Name}</h2>;
                  })}

                  <h3>
                    {guideUserDetails.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{item.userrole}</td>
                        </tr>
                      );
                    })}
                  </h3>
                  <div className="social-links mt-2">
                    <a
                      href="https://www.google.com/gmail/about/"
                      className="envelope"
                    >
                      <i className="bi bi-envelope" />
                    </a>
                    <a href="https://github.com/" className="github">
                      <i className="bi bi-github" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="card">
                <div className="card-body pt-3">
                  {/* Bordered Tabs */}
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                      >
                        Overview
                      </button>
                    </li>
                    <li className="nav-item">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                      >
                        Edit Profile
                      </button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div
                      className="tab-pane fade show active profile-overview"
                      id="profile-overview"
                    >
                      <h5 className="card-title">About</h5>
                      <p className="small fst-italic">
                        {guideDetails.map((item) => {
                          return <>{item.Guide_About}</>;
                        })}
                      </p>
                      <h5 className="card-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">Guide ID</div>
                        <div className="col-lg-9 col-md-8">
                          {guideUserDetails.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.username}</td>
                              </tr>
                            );
                          })}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label ">
                          Full Name
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {guideDetails.map((item) => {
                            return <>{item.Guide_Name}</>;
                          })}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Department
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {guideDetails.map((item) => {
                            return <>{item.Department}</>;
                          })}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">
                          Mobile Number
                        </div>
                        <div className="col-lg-9 col-md-8">
                          {guideDetails.map((item) => {
                            return <>{item.Guide_Phone}</>;
                          })}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">
                          {guideDetails.map((item) => {
                            return <>{item.Guide_Email}</>;
                          })}
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Github</div>
                        <div className="col-lg-9 col-md-8">
                          {guideDetails.map((item) => {
                            return <>{item.Guide_Github}</>;
                          })}
                        </div>
                      </div>
                    </div>

                    <div
                      className="tab-pane fade profile-edit pt-3"
                      id="profile-edit"
                    >
                      {/* Profile Edit Form */}
                      <form>
                        <div className="row mb-3">
                          <label
                            htmlFor="profileImage"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Profile Image
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <img src={data.publicUrl} alt="Profile" />
                            <div className="pt-2">
                              <input
                                type="file"
                                className="btn"
                                style={{
                                  backgroundColor: "#012971",
                                  color: "white",
                                }}
                                onChange={(e) => {
                                  handleFileChange(e);
                                }}
                              />
                            </div>

                            {/* <input type="file" onChange={handleFileChange} /> */}
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            htmlFor="fullName"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Full Name
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="fullName"
                              type="text"
                              className="form-control"
                              id="fullName"
                              defaultValue={guideName}
                              onChange={(e) => {
                                setGuideName(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="about"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            About
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              name="about"
                              className="form-control"
                              id="about"
                              style={{ height: "100px" }}
                              defaultValue={guideAbout}
                              onChange={(e) => {
                                setGuideAbout(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="company"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Department
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="company"
                              type="text"
                              className="form-control"
                              id="company"
                              defaultValue={guideDepartment}
                              onChange={(e) => {
                                setGuideDepartment(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Job"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Phone Number
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="job"
                              type="text"
                              className="form-control"
                              id="Job"
                              defaultValue={guidePhone}
                              onChange={(e) => {
                                setGuidePhone(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label
                            htmlFor="Country"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Email Address
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="country"
                              type="text"
                              className="form-control"
                              id="Country"
                              defaultValue={guideEmail}
                              onChange={(e) => {
                                setGuideEmail(e.target.value);
                              }}
                            />
                          </div>
                        </div>

                        <div className="row mb-3">
                          <label
                            htmlFor="Linkedin"
                            className="col-md-4 col-lg-3 col-form-label"
                          >
                            Github
                          </label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="linkedin"
                              type="text"
                              className="form-control"
                              id="Linkedin"
                              defaultValue={guideGithub}
                              onChange={(e) => {
                                setGuideGithub(e.target.value);
                              }}
                            />
                          </div>
                        </div>
                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn w-100"
                            style={{
                              backgroundColor: "#012971",
                              color: "white",
                            }}
                            onClick={(e) => {
                              saveGuideDetails(e);
                              getGuideData();
                              uploadFile();
                              //navigate("/login");
                            }}
                          >
                            Save Changes
                          </button>
                        </div>
                      </form>
                      {/* End Profile Edit Form */}
                    </div>

                    <div
                      className="tab-pane fade pt-3"
                      id="profile-change-password"
                    ></div>
                  </div>
                  {/* End Bordered Tabs */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
