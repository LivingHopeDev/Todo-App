var express = require("express");
var todoController = require("./controllers/todoController");

var app = express();

// Set up template engine
app.set("view engine", "ejs");

// Static file
app.use(express.static("./public"));

// Fire todo controller
todoController(app);

// Setting port
app.listen(8000);
console.log("Running at port 8000");

// To install all dependencies used in a particular project, use 'npm install'
