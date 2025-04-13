const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const URL = process.env.MONGO_URL;

// Connect to the database
mongoose.connect(URL);

// Create a schema
const todoSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true,
  },
});

const Todo = mongoose.model("todo", todoSchema);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get("/todo", async (request, response) => {
    const data = await Todo.find();
    response.render("todo", { todos: data });
  });

  app.post("/todo", urlencodedParser, async (request, response) => {
    const data = await Todo.insertOne(request.body);
    response.json(data);
  });

  app.delete("/todo/:id", async (request, response) => {
    // const data = Todo.findByIDAnddelete();
    const id = request.params.id;
    const data = await Todo.findByIdAndDelete(id);
    console.log(data);
    response.json(data);
  });
};
