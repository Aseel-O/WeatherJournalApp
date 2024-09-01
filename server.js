// Setup empty JS object to act as endpoint for all routes
const projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(
  bodyParser.urlencoded({ extended: false })
);
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static("project"));

// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
  console.log("server running");
  console.log(`running on localhost:${port}`);
}

app.get("/all", getProjectData);
function getProjectData(req, res) {
  res.send(projectData);
  console.log(projectData);
}

app.post("/add", addProjectData);
function addProjectData(req, res) {
  // const newData = {};
  projectData['date'] = req.body.date;
  projectData['temperature'] = req.body.temperature;
  projectData['user_response'] = req.body.user_response;
  // projectData.append(newData);
  res.send(projectData);
  console.log("data added to project:");
  console.log(projectData);
}
