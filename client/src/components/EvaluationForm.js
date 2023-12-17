import React, { useState, useEffect } from "react";
import GuideNavBar from "./GuideNavBar";
import GuideSideBar from "./GuideSideBar";
import Axios from "axios";

export default function EvaluationForm() {
  const [projectOverviewMarks, setProjectOverviewMarks] = useState();
  const [reqSpecMarks, setReqSpecMarks] = useState();
  const [detailedDesignMarks, setDetailedDesignMarks] = useState();
  const [constructionMarks, setConstructionMarks] = useState();
  const [testingMarks, setTestingMarks] = useState();
  const [documentMarks, setDocumentMarks] = useState();
  const [alumniPresentationMarks, setAlumniPresentationMarks] = useState();
  const [alumniDemonstrationMarks, setAlumniDemonstrationMarks] = useState();
  const [panelPresentationMarks, setPanelPresentationMarks] = useState();
  const [panelDemonstrationMarks, setPanelDemonstrationMarks] = useState();
  const [status, setStatus] = useState();

  const POMarks = (event) => {
    event.preventDefault();
    console.log(projectOverviewMarks);
    console.log("ID " + sessionStorage.getItem("StudentCardID"));
    console.log("Marks " + projectOverviewMarks);

    Axios.post("http://localhost:3001/guide/updatePOMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Project Overview",
      marks: projectOverviewMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  const RSMarks = (event) => {
    event.preventDefault();
    console.log(reqSpecMarks);
    Axios.post("http://localhost:3001/guide/updateRSMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Requirement Specification",
      marks: reqSpecMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  const DDMarks = (event) => {
    event.preventDefault();
    console.log(reqSpecMarks);
    Axios.post("http://localhost:3001/guide/updateDDMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Detailed Design",
      marks: detailedDesignMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  const CMarks = (event) => {
    event.preventDefault();
    console.log(reqSpecMarks);
    Axios.post("http://localhost:3001/guide/updateCMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Construction",
      marks: constructionMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  const CTMarks = (event) => {
    event.preventDefault();
    console.log(reqSpecMarks);
    Axios.post("http://localhost:3001/guide/updateCTMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Testing",
      marks: testingMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  const DMarks = (event) => {
    event.preventDefault();
    console.log(reqSpecMarks);
    Axios.post("http://localhost:3001/guide/updateDMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Documentation",
      marks: documentMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  const AEMarks = (event) => {
    event.preventDefault();
    console.log(alumniDemonstrationMarks);
    console.log(alumniPresentationMarks);
    Axios.post("http://localhost:3001/guide/updateAEMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Alumni Evaluation",
      marks: +alumniDemonstrationMarks + +alumniPresentationMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  //DPMarks
  const DPMarks = (event) => {
    event.preventDefault();
    console.log(panelDemonstrationMarks);
    console.log(panelPresentationMarks);
    Axios.post("http://localhost:3001/guide/updateDPMarks", {
      id: sessionStorage.getItem("StudentCardID"),
      category: "Department Panel",
      marks: +panelDemonstrationMarks + +panelPresentationMarks,
    })
      .then((response) => {
        setStatus({ type: "success" });
        getMarks();
      })
      .catch((error) => {
        setStatus({ type: "Error" });
      });
  };

  //validation

  const checkpomarks = (value) => {
    const error = document.getElementById("pomarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("pomarksbutton").disabled = true;
    } else if (value <= 10 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("pomarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("pomarksbutton").disabled = true;
    } else if (value > 10) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 10</span>";
      document.getElementById("pomarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("pomarksbutton").disabled = true;
    }
  };

  const checkrsmarks = (value) => {
    const error = document.getElementById("rsmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("rsmarksbutton").disabled = true;
    } else if (value <= 20 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("rsmarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("rsmarksbutton").disabled = true;
    } else if (value > 20) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 20</span>";
      document.getElementById("rsmarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("rsmarksbutton").disabled = true;
    }
  };

  const checkddmarks = (value) => {
    const error = document.getElementById("ddmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("ddmarksbutton").disabled = true;
    } else if (value <= 20 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("ddmarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("ddmarksbutton").disabled = true;
    } else if (value > 20) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 20</span>";
      document.getElementById("ddmarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("ddmarksbutton").disabled = true;
    }
  };

  const checkcmarks = (value) => {
    const error = document.getElementById("cmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("cmarksbutton").disabled = true;
    } else if (value <= 10 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("cmarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("cmarksbutton").disabled = true;
    } else if (value > 10) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 10</span>";
      document.getElementById("cmarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("cmarksbutton").disabled = true;
    }
  };

  const checkctmarks = (value) => {
    const error = document.getElementById("ctmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("ctmarksbutton").disabled = true;
    } else if (value <= 20 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("ctmarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("ctmarksbutton").disabled = true;
    } else if (value > 20) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 20</span>";
      document.getElementById("ctmarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("ctmarksbutton").disabled = true;
    }
  };

  const checkdmarks = (value) => {
    const error = document.getElementById("dmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("dmarksbutton").disabled = true;
    } else if (value <= 20 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("dmarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("dmarksbutton").disabled = true;
    } else if (value > 20) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 10</span>";
      document.getElementById("dmarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("dmarksbutton").disabled = true;
    }
  };

  const checkaepmarks = (value) => {
    const error = document.getElementById("aepmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("aemarksbutton").disabled = true;
    } else if (value <= 10 && value >= 0) {
      error.innerHTML = "";
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("aemarksbutton").disabled = true;
    } else if (value > 10) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 10</span>";
      document.getElementById("aemarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("aemarksbutton").disabled = true;
    }
  };

  const checkaedmarks = (value) => {
    const error = document.getElementById("aedmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("aemarksbutton").disabled = true;
    } else if (value <= 40 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("aemarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("aemarksbutton").disabled = true;
    } else if (value > 40) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 40</span>";
      document.getElementById("aemarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("aemarksbutton").disabled = true;
    }
  };

  const checkdppmarks = (value) => {
    const error = document.getElementById("dppmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    } else if (value <= 10 && value >= 0) {
      error.innerHTML = "";
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    } else if (value > 10) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 10</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    }
  };

  const checkdpdmarks = (value) => {
    const error = document.getElementById("dpdmarkserror");
    var numbers = /^[0-9]+$/;
    if (value === null || value === "") {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be empty</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    } else if (value <= 40 && value >= 0) {
      error.innerHTML = "";
      document.getElementById("dpmarksbutton").disabled = false;
    } else if (value < 0) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be less than zero</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    } else if (value > 40) {
      error.innerHTML =
        "<span style='color: red'>Error: Marks can not be more than 40</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    } else if (!value.match(numbers)) {
      error.innerHTML =
        "<span style='color: red'>Error: No characters allowed</span>";
      document.getElementById("dpmarksbutton").disabled = true;
    }
  };
  // //getting the marks details for a particular student
  const [marksDetails, setMarksDetails] = useState([]);

  const getMarks = async () => {
    const marksResponse = await Axios.get("http://localhost:3001/getMarks", {
      params: { id: sessionStorage.getItem("StudentCardID") },
    });
    setMarksDetails(marksResponse.data);
    console.log(marksResponse.data);
  };

  useEffect(() => {
    getMarks();
  }, []);

  //marks table should consist
  //1. student id
  //2. guide id - the guide who is evaluating the student

  //3. CIA Component
  //3 a. Project Overview - 10 marks
  //3 b. Requirement Specification - 20 marks
  //3 c. Detailed Design - 20 marks
  //3 d. Construction - 10 marks
  //3 e. Testing - 20 marks
  //e f. Document Submission - 20 marks

  //4. ESE component
  //4 a. Project Presentation 1 - Alumni
  //4 b. Demonstration - Alumni
  //4 c. Project Presentation 2 - Department Panel
  //4 d. Demonstration - Department Panel -
  return (
    <div>
      <GuideNavBar />
      <GuideSideBar />
      <main id="main" className="main">
        <div className="card-body ml-5">
          {/* marksDetails */}
          <div className="pagetitle">
            <h1>Marks Awarded</h1>
          </div>
          <div className="card col-lg-8 mt-4">
            <div className="card-body pl-5 pr-5">
              <h5 className="card-title">
                Marks Awarded to {sessionStorage.getItem("StudentCardID")}
              </h5>
              <table className="table">
                <tbody>
                  <tr>
                    <th> Category</th>
                    <th>Marks</th>
                  </tr>

                  {marksDetails.map((item) => {
                    return (
                      <tr>
                        <td> {item.CATEGORY}</td>
                        <td>{item.MARKS}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="pagetitle mt-5 mb-4">
            <h1>CIA Components</h1>
          </div>
          <div className="d-flex flex-row gap-4 flex-wrap">
            {/* Project Overview Marks */}
            <div className="card col-lg-3 p-3 mr-5">
              <div className="card-body">
                <h5 className="card-title">Project Overview - 10 Marks</h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Marks
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 10"
                        onChange={(e) => {
                          setProjectOverviewMarks(e.target.value);
                          checkpomarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="pomarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      id="pomarksbutton"
                      // disabled="disabled"
                      type="submit"
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        POMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Requirement Specification Marks */}
            <div className="card col-lg-3 p-3 mr-5">
              <div className="card-body">
                <h5 className="card-title">
                  Requirement Specification - 20 Marks
                </h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Marks
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 20"
                        onChange={(e) => {
                          setReqSpecMarks(e.target.value);
                          checkrsmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="rsmarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      id="rsmarksbutton"
                      //disabled="disabled"
                      type="submit"
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        RSMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Detailed Design Marks */}
            <div className="card col-lg-3 p-3 mr-5">
              <div className="card-body">
                <h5 className="card-title">Detailed Design - 20 Marks</h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Marks
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 20"
                        onChange={(e) => {
                          setDetailedDesignMarks(e.target.value);
                          checkddmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="ddmarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      id="ddmarksbutton"
                      //disabled="disabled"
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        DDMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Construction Marks */}
            <div className="card col-lg-3 p-3 mr-5">
              <div className="card-body">
                <h5 className="card-title">Construction - 10 Marks</h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Marks
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 10"
                        onChange={(e) => {
                          setConstructionMarks(e.target.value);
                          checkcmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="cmarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      //disabled="disabled"
                      id="cmarksbutton"
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        CMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Testing Marks */}
            <div className="card col-lg-3 p-3 mr-5">
              <div className="card-body">
                <h5 className="card-title">Component Testing - 20 Marks</h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Marks
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 20"
                        onChange={(e) => {
                          setTestingMarks(e.target.value);
                          checkctmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="ctmarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      //disabled="disabled"
                      id="ctmarksbutton"
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        CTMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Documentation Marks */}
            <div className="card col-lg-3 p-3 mr-5">
              <div className="card-body">
                <h5 className="card-title">Documentation - 20 Marks</h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Marks
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 20"
                        onChange={(e) => {
                          setDocumentMarks(e.target.value);
                          checkdmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="dmarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      //disabled="disabled"
                      id="dmarksbutton"
                      className="btn w-100 mt-3"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        DMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ESE Components */}
        <div className="card-body  ml-5">
          <div className="pagetitle mb-3">
            <h1>ESE Components</h1>
          </div>
          <div className="d-flex flex-row gap-4 flex-wrap">
            {/* Alumni Evaluation Marks */}
            <div className="card col-lg-5 p-3">
              <div className="card-body">
                <h5 className="card-title">Alumni Evaluation - 50 Marks</h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Presentation
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 10"
                        onChange={(e) => {
                          setAlumniPresentationMarks(e.target.value);
                          checkaepmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 col-lg-9">
                    <p id="aepmarkserror"></p>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Demonstration
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 40"
                        onChange={(e) => {
                          setAlumniDemonstrationMarks(e.target.value);
                          checkaedmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="aedmarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      //disabled="disabled"
                      id="aemarksbutton"
                      className="btn w-100 mt-4"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        AEMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Department Panel Evaluation Marks */}
            <div className="card col-lg-5 p-3 ml-4">
              <div className="card-body">
                <h5 className="card-title">
                  Department Panel Evaluation - 50 Marks
                </h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Presentation
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 10"
                        onChange={(e) => {
                          setPanelPresentationMarks(e.target.value);
                          checkdppmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="dppmarkserror"></p>
                  </div>
                  <div className="row mb-3">
                    <label
                      htmlFor="guide_id"
                      className="col-md-4 col-lg-4 col-form-label"
                    >
                      Demonstration
                    </label>
                    <div className="col-md-8 col-lg-8">
                      <input
                        name="teamNumber"
                        type="text"
                        className="form-control col-lg-12"
                        id="teamNumber"
                        defaultValue=""
                        placeholder="Out of 40"
                        onChange={(e) => {
                          setPanelDemonstrationMarks(e.target.value);
                          checkdpdmarks(e.target.value);
                        }}
                      />
                    </div>
                  </div>
                  <div className="mt-3 w-100">
                    <p id="dpdmarkserror"></p>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      //disabled="disabled"
                      id="dpmarksbutton"
                      className="btn w-100 mt-4"
                      style={{ backgroundColor: "#012971", color: "white" }}
                      onClick={(e) => {
                        DPMarks(e);
                      }}
                    >
                      Submit Marks
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
