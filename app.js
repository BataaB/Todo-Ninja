const express = require("express");
const todoController = require("./controllers/todo.controller");

const app = express();

// Set up template engine
app.set("view engine", "ejs");

// Static files
app.use(express.static("./public"));

// Fire controllers
todoController(app);

// Listen to port
const PORT = 3000;
app.listen(PORT, () => {
  console.log("Started listening on port " + PORT);
});
