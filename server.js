const express = require("express");
const path = require("path");

//Creating an instance of Express
const app = express();

// Serve only the static files form the pages directory
app.use(express.static(__dirname + "/"));

app.get("/grape", function(req, res) {
  res.sendFile(path.join(__dirname + "/index.html"));
});

app.get("/rocket", function(req, res) {
  res.sendFile(path.join(__dirname + "/pages/index-2.html"));
});

app.listen(process.env.PORT || 3000);
