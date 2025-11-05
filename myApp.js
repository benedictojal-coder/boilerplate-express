require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use("/public", express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/json", (req, res) => {
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

app.get("/now", addCurrentTime, (req, res) => {
  res.json({ time: req.time });
});

app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

app.route("/name")
  .get((req, res) => {
    const firstName = req.query.first;
    const lastName = req.query.last;
    const fullName = `${firstName} ${lastName}`;
    res.json({ name: fullName });
  })
  .post((req, res) => {
    const firstName = req.body.first;
    const lastName = req.body.last;
    const fullName = `${firstName} ${lastName}`;
    res.json({ name: fullName });
  });

module.exports = app;
