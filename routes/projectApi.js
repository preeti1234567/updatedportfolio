const path = require("path");
const fs = require("fs");

module.exports = function (app) {
  const FILE_PATH = "db/projects.json";
  let projects = [];

  function getId() {
    if (projects.length === 0) {
      return 1;
    } else {
      let lastDataInArray = projects.pop();
      projects.push(lastDataInArray);
      return lastDataInArray.id + 1;
    }
  }

  function updateDb() {
    fs.writeFile(FILE_PATH, JSON.stringify(projects, "/t"), (err) => {
      if (err) throw err;
      return true;
    });
    ReadData();
  }

  function ReadData() {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) throw err;
      projects = JSON.parse(data);
    });
  }

  app.get("/api/projects", (req, res) => {
    ReadData();
    return res.json(projects);
  });

  app.post("/api/projects", (req, res) => {
    var reqData = req.body;
    if (
      reqData.title &&
      reqData.description &&
      reqData.github_link &&
      reqData.deploy_link &&
      reqData.pictureurl
    ) {
      var data = {
        id: getId(),
        title: reqData.title,
        description: reqData.description,
        github_link: reqData.github_link,
        deploy_link: reqData.deploy_link,
        pictureurl: reqData.pictureurl,
      };
      projects.push(data);
      updateDb();
      console.log("Added new project" + data.title);
      return res.status(201).json({ message: "new record created" });
    }
    return res.status(400).json({ error: "Not valid data" });
  });

  app.put("/api/projects/:id", (req, res) => {
    if (req.params.id) {
      const targetObject = notes.find(
        (item) => item.id === parseInt(req.params.id)
      );
      if (targetObject) {
        if (
          reqData.title &&
          reqData.description &&
          reqData.github_link &&
          reqData.deploy_link &&
          reqData.pictureurl
        ) {
          var data = {
            id: req.params.id,
            title: reqData.title,
            description: reqData.description,
            github_link: reqData.github_link,
            deploy_link: reqData.deploy_link,
            pictureurl: reqData.pictureurl,
          };
          projects[req.params.id] = data;
          updateDb();
          console.log("updated project" + data.title);
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
