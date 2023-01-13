var bodyParser = require("body-parser");
var mongoose = require("mongoose");

// Connecting to mongoDb
mongoose.set("strictQuery", false);
var dbURI =
  "mongodb+srv://Adetayo:secretpassword@todocluster.wt9kjun.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(dbURI, { useNewUrlParser: true })
  .then((result) => {
    console.log("connected to the database");
  })
  .catch((err) => {
    console.log(err);
  });

// Create a schema-like a blueprint

var todoSchema = new mongoose.Schema({
  item: String,
});

// Create a model. A model is based on a schema

var todo = mongoose.model("Todo", todoSchema);
// var itemOne = todo({ item: "I will read some books" }).save((err) => {
//   if (err) throw err;
//   console.log("Item saved");
// });

// var data = [{ item: "Pray" }, { item: "read the bible" }, { item: "Code" }];

var urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = (app) => {
  app.get("/", (req, res) => {
    // Read data from mongodb
    todo.find({}, (err, data) => {
      if (err) throw err;
      res.render("todo", { todos: data });
    });
  });

  app.post("/todo", urlencodedParser, (req, res) => {
    //  Get data from the view and add it to mongodb
    var newTodo = todo(req.body).save((err, data) => {
      if (err) throw err;
      // res.json(data);
      res.redirect("/");
    });
  });

  app.delete("/todo/:id", (req, res) => {
    // Delete item from db

    todo.find({ _id: req.params.id }).deleteOne((err, data) => {
      if (err) throw err;
      res.json(data);
    });
  });
};
