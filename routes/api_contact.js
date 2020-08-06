const fs = require("fs");
const FILE_PATH = "db/contact.json";

module.exports = function (app) {
  let contacts = [];

  function getId() {
    if (contacts.length === 0) {
      return 1;
    } else {
      let lastDataInArray = contacts.pop();
      contacts.push(lastDataInArray);
      return lastDataInArray.id + 1;
    }
  }

  function updateDb() {
    fs.writeFile(FILE_PATH, JSON.stringify(contacts, "/t"), (err) => {
      if (err) throw err;
      ReadData();
      return true;
    });
  }

  function ReadData() {
    fs.readFile(FILE_PATH, "utf8", (err, data) => {
      if (err) throw err;
      contacts = JSON.parse(data);
    });
  }

  ReadData();

  app.post("/api/contact", function (req, res) {
    var reqData = req.body;
    if (reqData.name && reqData.email && reqData.subject && reqData.message) {
      var data = {
        id: getId(),
        name: reqData.name,
        email: reqData.email,
        subject: reqData.subject,
        message: reqData.message,
      };
      contacts.push(data);
      updateDb();
      console.log("Added new contact" + data.name);
      return res.status(201).json({ message: "new contact created" });
    }
    return res.status(400).json({ error: "Not valid data" });
  });
};
