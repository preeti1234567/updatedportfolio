const fs = require("fs");
const FILE_PATH = "db/portfolio.json";

module.exports = function (app) {
  let portfolios = [];

  function getId() {
    if (portfolios.length === 0) {
      return 1;
    } else {
      let lastDataInArray = projects.pop();
      portfolios.push(lastDataInArray);
      return lastDataInArray.id + 1;
    }
  }

  function updateDb() {
    fs.writeFile(FILE_PATH, JSON.stringify(portfolios, "/t"), (err) => {
      if (err) throw err;
      ReadData();
      return true;
    });
  }

  function ReadData() {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) throw err;
      portfolios = JSON.parse(data);
    });
  }

  ReadData();

  app.get("/api/portfolio", (req, res) => {
    return res.json(portfolios);
  });

  app.post("/api/portfolio", function (req, res) {
    var reqData = req.body;
    if (reqData.title && reqData.description) {
      var data = {
        id: req.params.id,
        title: reqData.title,
        description: reqData.description,
      };
      portfolios.push(data);
      updateDb();
      console.log("Added new portfolio" + data.name);
      return res.status(201).json({ message: "new portfolio created" });
    }
    return res.status(400).json({ error: "Not valid data" });
  });

  app.put("/api/portfolio/:id", (req, res) => {
    if (req.params.id) {
      var reqData = req.body;
      const targetObject = portfolios.find(
        (item) => item.id === parseInt(req.params.id)
      );
      if (targetObject) {
        if (reqData.title && reqData.description) {
          var data = {
            id: req.params.id,
            title: reqData.title,
            description: reqData.description,
          };
          portfolios[req.params.id] = data;
          updateDb();
          console.log("updated portfolio" + data.title);
          return res.status(201).json({ message: "record updated" });
        }
        return res.status(400).json({ error: "Not valid data" });
      } else {
        return res
          .status(404)
          .json({ error: "No Record found for id selected" });
      }
    }
  });
};
