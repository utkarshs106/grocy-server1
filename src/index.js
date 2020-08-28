var express = require("express");
var app = express();
var cors = require("cors");
app.use(cors());
const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://rko:rkorko@cluster0.ztfun.gcp.mongodb.net/people",
  { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true }
);
const peopleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  phone: { type: Number, unique: true, required: true },
  password: { type: String, required: true },
  Shops: []
});
const People = mongoose.model("People", peopleSchema);

const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/testAPI", function (req, res) {
  var a = { name: "Akash", typeOfperson: "very stupid", age: "10" };
  console.log(req.body);
  console.log("entered");
  res.send(JSON.stringify(a));
});

app.get("/", function (req, res) {
  res.send("hellow");
});

app.get("/home", function (req, res) {
  console.log("home reached");
  var ab = { name: "Rahul" };
  res.send(JSON.stringify(ab));
});

app.post("/login", function (req, res) {
  var email = req.body.email;
  var password = req.body.password;

  People.find({ email: email, password: password }, function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      res.send(result);
    }
  });
});

app.post("/change", function (req, res) {
  console.log(req);
});
app.post("/register", function (req, res) {
  const user = new People({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password
  });
  user.save(function (err, result) {
    if (err) {
      console.log(err);
    }
    if (result) {
      res.send(JSON.stringify(result));
    }
  });
});

app.listen(3000, function () {
  console.log("server listning at port sucessfuly");
});
