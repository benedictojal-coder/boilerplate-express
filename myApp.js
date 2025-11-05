require("dotenv").config();
let express = require("express");
let app = express();

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

// --- New route with route parameter ---
app.get("/:word/echo", (req, res) => {
  const word = req.params.word;
  res.json({ echo: word });
});

module.exports = app;
