const express = require("express");
const path = require("path");
//const fs = require("fs");
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "/index.html"));
  });

  app.get("/portfolio", function (req, res) {
    res.sendFile(path.join(__dirname, "/html/portfolio.html"));
  });

  app.get("/resume", function (req, res) {
    res.sendFile(path.join(__dirname, "/assets/pdf/PreetiGupta.pdf"));
  });

  
  app.get("/contact", function (req, res) {
    res.sendFile(path.join(__dirname, "/html/contact.html"));
  });


require('./routes/contactApi')(app)
require('./routes/projectApi')(app)
require('./routes/portfolioApi')(app)


app.listen(PORT, function () {
    console.log("App listening on PORT: " + PORT);
  });

