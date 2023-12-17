const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();
const bodyParser = require("body-parser");

const cookieParser = require("cookie-parser");
const sessions = require("express-session");

const oneDay = 1000 * 60 * 60 * 24;

//middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false })); //check for true
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

//connecting to the database
const db = mysql.createConnection({
  user: "admin",
  host: "projectdata-2247206.cd70djtkrx08.us-east-1.rds.amazonaws.com",
  password: "12345678",
  database: "teamtrackr",
});

//register
app.post("/register", (req, res) => {
  const { userrole, username, password } = req.body;

  let insertSQL =
    "INSERT INTO `users` VALUES ('" +
    userrole +
    "', '" +
    username +
    "','" +
    password +
    "')";

  db.execute(insertSQL, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

// Login
app.post("/login", function (req, res) {
  //console.log(1 + req.body);
  let { username, password } = req.body;

  let selectSQl = "SELECT * FROM `users` WHERE `username` = '" + username + "'";

  db.query(selectSQl, (err, rows) => {
    if (err) throw err;

    if (rows.length > 0) {
      if (rows[0].password === password) {
        //session = req.session;
        sessions.username = username;
        console.log("1" + sessions.username);

        res.send(rows);
        //res.send("Success");
        console.log("success");
      } else {
        res.send("IncorrectPassword");
      }
    } else {
      res.send("Invalid Email");
    }
  });
});

//get user (guide) information
app.get("/guide/userdata", (req, res) => {
  //console.log(sessions.username);
  const sqlGet =
    "SELECT * FROM users WHERE userrole = 'Project Guide' and username = '" +
    sessions.username +
    "'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get user (student) information
app.get("/student/userdata", (req, res) => {
  //console.log(sessions.username);
  const sqlGet =
    "SELECT * FROM USERS WHERE USERROLE = 'Student' and username = '" +
    sessions.username +
    "'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//update the guide details
app.post("/saveGuideDetails", (req, res) => {
  const {
    guide_name,
    guide_about,
    department,
    guide_phone,
    guide_email,
    guide_github,
  } = req.body;
  console.log(req.body);

  var fields = [
    guide_name,
    guide_about,
    department,
    guide_phone,
    guide_email,
    guide_github,
    sessions.username,
  ];
  var updateQuery =
    "UPDATE guide SET guide_name = ?, guide_about = ?, department=?, guide_phone = ?, guide_email = ?, guide_github = ? where guide_id =  ?";

  db.execute(updateQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//update the student details
app.post("/saveStudentDetails", (req, res) => {
  const {
    student_name,
    student_about,
    student_guide,
    department,
    student_phone,
    student_email,
    student_github,
  } = req.body;
  console.log(req.body);

  var fields = [
    student_name,
    student_about,
    department,
    student_phone,
    student_email,
    student_github,
    student_guide,
    sessions.username,
  ];
  var updateQuery =
    "UPDATE student SET student_name = ?, student_about = ?, department=?, student_phone = ?, student_email = ?, student_github = ?, guide = ? where student_id =  ?";

  db.execute(updateQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//get guide information
app.get("/guide/data", (req, res) => {
  console.log("guideData" + sessions.username);
  const sqlGet =
    "SELECT * FROM guide WHERE Guide_id = '" + sessions.username + "'";
  db.execute(sqlGet, (error, result) => {
    res.send(result);
    console.log("Guide" + result);
  });
});

//get student information
app.get("/student/data", (req, res) => {
  console.log("Student Error" + sessions.username);
  const sqlGet =
    "SELECT * FROM STUDENT WHERE Student_id = '" + sessions.username + "'";
  db.execute(sqlGet, (error, result) => {
    res.send(result);
    console.log("Student" + result);
  });
});

//get guide for student
app.get("/guideforstudent", (req, res) => {
  console.log(sessions.username);
  const sqlGet =
    "select * from student inner join guide on student.guide = guide.guide_id where student_id = '" +
    sessions.username +
    "'";

  db.execute(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
    //console.log(sessions.username);
  });
});

//add a team
app.post("/guide/addTeam", (req, res) => {
  const {
    team_number,
    project_name,
    project_description,
    member1,
    member2,
    member3,
  } = req.body;
  console.log(req.body);

  var fields = [
    sessions.username,
    team_number,
    project_name,
    project_description,
    member1,
    member2,
    member3,
  ];
  var insertQuery =
    "Insert into team(guide_id, team_id, project_name, project_description, member1, member2, member3) values(?,?,?,?,?,?,?)";

  db.execute(insertQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//get teams information
app.get("/getTeams", (req, res) => {
  //console.log(sessions.username);
  const sqlGet =
    "SELECT * FROM team WHERE Guide_ID = '" + sessions.username + "'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log("getTeams" + result);
  });
});

//add a task
app.post("/guide/addtask", (req, res) => {
  const { task_number, task_name, task_description, start_date, end_date } =
    req.body;
  console.log(req.body);
  console.log(sessions.username);
  var fields = [
    task_number,
    sessions.username,
    task_name,
    task_description,
    start_date,
    end_date,
  ];
  console.log(fields);
  var insertQuery =
    "Insert into tasks(task_number, guide_id, task_name, task_description, start_date, end_date) values(?,?,?,?,?,?)";

  db.execute(insertQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//get tasks information
app.get("/getTasks", (req, res) => {
  console.log(sessions.username);
  const sqlGet = "SELECT * FROM tasks";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    //console.log(result);
  });
});

//add session
//addsession
app.post("/guide/addsession", (req, res) => {
  const {
    session_number,
    task_number,
    session_name,
    session_description,
    date,
  } = req.body;
  console.log(req.body);
  console.log(sessions.username);
  var fields = [
    session_number,
    task_number,
    sessions.username,
    session_name,
    session_description,
    date,
  ];
  console.log(fields);
  var insertQuery =
    "Insert into session(session_number, task_number, guide_id, session_name, session_description, date) values(?,?,?,?,?,?)";
  db.execute(insertQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//get session information
app.get("/getSessions", (req, res) => {
  console.log(sessions.username);
  const sqlGet =
    "SELECT * FROM SESSION where task_number = " + req.query.task_number;
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get session information for students
app.get("/getStudentSessions", (req, res) => {
  console.log(sessions.username);
  const sqlGet =
    "SELECT * FROM SESSION where task_number = " + req.query.task_number;
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//make entry in the project diary
app.post("/makeentry", (req, res) => {
  const {
    task_number,
    session_number,
    work_planned,
    work_completed,
    entry_date,
  } = req.body;
  console.log(req.body);
  console.log(sessions.username);
  var fields = [
    sessions.username,
    task_number,
    session_number,
    work_planned,
    work_completed,
    entry_date,
  ];
  console.log(fields);
  var insertQuery =
    "Insert into Project_Diary(username, task_number, session_number, work_planned, work_completed, entry_date) values(?,?,?,?,?,?)";
  db.execute(insertQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//get project entry information
app.get("/getentries", (req, res) => {
  console.log(sessions.username);
  const sqlGet =
    "SELECT * FROM PROJECT_DIARY WHERE USERNAME = '" + sessions.username + "'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get project diary entry information for the guide
app.get("/projectDiaryEntry", (req, res) => {
  console.log(sessions.username);
  const sqlGet = "SELECT * FROM PROJECT_DIARY";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get names of the students for project diary entry cards in the evaluation (for guide's module)
app.get("/getStudentNames", (req, res) => {
  console.log(sessions.username);
  const sqlGet = "SELECT * FROM student where student_id like 'S%'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get student submissions for guides
app.get("/getStudentSubmissions", (req, res) => {
  console.log("getStudent" + req.query.id);
  const sqlGet =
    "SELECT * FROM project_diary where username = '" +
    req.query.id +
    "' and task_number = '" +
    req.query.week +
    "'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//upsert the marks for project overview
app.post("/guide/updatePOMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for requirement specifications
app.post("/guide/updateRSMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for detailed design
app.post("/guide/updateDDMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for Construction
app.post("/guide/updateCMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for component testing
app.post("/guide/updateCTMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for requirement specifications
app.post("/guide/updateDMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for alumni evaluation marks
app.post("/guide/updateAEMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for Department Panel
app.post("/guide/updateDPMarks", (req, res) => {
  const { id, category, marks } = req.body;
  console.log(req.body);
  var fields = [id, category, marks, marks];
  var sqlQuery =
    "INSERT INTO MARKS (USERNAME, CATEGORY, MARKS) VALUES(?,?,?) ON DUPLICATE KEY UPDATE MARKS = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//upsert the marks for Department Panel
app.post("/givefeedback", (req, res) => {
  const {
    week_number,
    session_number,
    work_planned,
    work_completed,
    date,
    feedback,
    student_id,
  } = req.body;
  console.log(req.body);
  var fields = [
    student_id,
    week_number,
    session_number,
    work_planned,
    work_completed,
    date,
    feedback,
    feedback,
  ];
  var sqlQuery =
    "INSERT INTO FEEDBACK (student, week_number, session_number, work_planned, work_completed, entry_date, feedback ) VALUES(?,?,?,?,?,?,?) ON DUPLICATE KEY UPDATE feedback = ?";
  db.execute(sqlQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});
//getFeedback
app.get("/getFeedback", (req, res) => {
  const sqlGet =
    "SELECT * FROM FEEDBACK where week_number = " +
    req.query.week_number +
    " and session_number = " +
    req.query.session_number +
    " and student = '" +
    req.query.student +
    "'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//getting marks for a particular student
app.get("/getMarks", (req, res) => {
  const sqlGet = "SELECT * FROM MARKS where username = '" + req.query.id + "'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    //console.log(result);
  });
});

//getting weeks
app.get("/getWeeks", (req, res) => {
  const sqlGet = "SELECT * FROM tasks";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//Admin login
app.post("/adminlogin", function (req, res) {
  //console.log(1 + req.body);
  let { username, password } = req.body;

  let selectSQl = "SELECT * FROM `admin` WHERE `username` = '" + username + "'";

  db.query(selectSQl, (err, rows) => {
    if (err) throw err;
    console.log(rows[0]);
    if (rows.length > 0) {
      if (rows[0].PASSWORD === password) {
        //session = req.session;
        sessions.username = username;
        console.log("1" + sessions.username);

        res.send("Success");
        console.log("success");
      } else {
        res.send("IncorrectPassword");
      }
    } else {
      res.send("Invalid Username");
    }
  });
});

//get admin data
app.get("/getadmindata", (req, res) => {
  const sqlGet = "SELECT * FROM ADMIN";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get messages
app.get("/getmessage", (req, res) => {
  const sqlGet = "SELECT * FROM MESSAGES";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get guide data for admin dashboard
app.get("/getguidedata", (req, res) => {
  const sqlGet = "SELECT * FROM GUIDE where guide_id like 'G-%'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//get student data for admin dashboard
app.get("/getstudentdata", (req, res) => {
  const sqlGet = "SELECT * FROM STUDENT where student_id like 'S-%'";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//show messages to admin
app.get("/getmessage-des", (req, res) => {
  let { id } = req.query;
  console.log(id);
  const sqlGet = "SELECT * FROM MESSAGES where NAME = '" + id + "' ";
  db.query(sqlGet, (error, result) => {
    res.send(result);
    console.log(result);
  });
});

//message admin
app.post("/addmessage", (req, res) => {
  const { Name, Issue, Description } = req.body;
  console.log(req.body);
  const fields = [Name, Issue, Description];
  console.log(fields);
  const insertQuery =
    "Insert into Messages(Name, Issue, Description) values(?,?,?)";

  db.execute(insertQuery, fields, (err, result) => {
    console.log(err);
    res.send(result);
  });
});

//admin-authentication
app.get("/guide-auth", (req, res) => {
  console.log(sessions.username);
  if (sessions.username === undefined) {
    res.send("fail");
  } else {
    res.send("success");
  }
});

//logout
app.get("/logout", (req, res) => {
  sessions.username = undefined;
  console.log("logged out");
  res.send("success");
});

//app listening to port 3001
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
