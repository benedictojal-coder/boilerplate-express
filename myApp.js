require("dotenv").config();
const express = require("express");
const app = express();

app.use("/public", express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", function (req, res) {
  let message = "Hello json";
  if (process.env.MESSAGE_STYLE === "uppercase") {
    message = message.toUpperCase();
  }
  res.json({ message });
});

function addCurrentTime(req, res, next) {
  req.time = new Date().toString();
  next();
}

app.get("/now", addCurrentTime, function (req, res) {
  res.json({ time: req.time });
});

app.get("/:word/echo", function (req, res) {
  const word = req.params.word;
  res.json({ echo: word });
});

app.get("/name", function (req, res) {
  const firstName = req.query.first;
  const lastName = req.query.last;
  const fullName = `${firstName} ${lastName}`;
  res.json({ name: fullName });
});

module.exports = app;
