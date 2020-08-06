const express = require("express");
const path = require("path");
//const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/index.html"));
  });
  app.get("/aboutMe", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/aboutMe.html"));
  });
  app.get("/portfolio", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/portfolio.html"));
  });

  app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "public/html/contact.html"));
  });


require('./routes/api_contact')(app);


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
  });

