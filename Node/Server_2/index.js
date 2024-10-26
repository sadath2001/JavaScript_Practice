const express = require("express");
const userData = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const port = 8000;
// data generate from https://www.mockaroo.com/
// Hybrid server

// middleware - to get data from frontend and display it as json
app.use(express.urlencoded({ extended: false }));

// custom middleware for adding logs
// next - next middleware
app.use((req, res, next) => {
  const logData = `\n${Date.now()}: ${req.ip}; ${req.method}; ${req.url}`;
  fs.appendFile("./log.txt", logData, (err, data) => {
    next();
  });
});

app.get("/users", (req, res) => {
  const data = userData.map((i) => `<li>${i.first_name}</li>`).join("");
  res.setHeader("X-sent-by", "ssadaths");
  return res.send(`<ul>${data}</ul>`);
});

app.get("/api/users", (req, res) => {
  return res.json(userData);
});
app.post("/api/users", (req, res) => {
  const body = req.body;
  console.log(body);
  userData.push({ ...body, id: userData.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err, data) => {
    res.json({ status: "Created", id: userData.length });
  });
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const data = userData.find((user) => user.id == req.params.id);
    return res.json(data);
  })
  .patch((req, res) => {
    const id = req.params.id;
    const body = req.body;
    console.log(body);
    const data = userData.find((user) => user.id == id);
    if (data) {
      userData.push({ ...body, id: id });
      fs.writeFile(
        "./MOCK_DATA.json",
        JSON.stringify(userData),
        (err, data) => {
          return res.json({ status: "success" });
        }
      );
    } else {
      return res.status(404).json({ status: "doenst exist" });
    }
  })
  .delete((req, res) => {
    const id = req.params.id;
    console.log(id);
    const data = userData.find((user) => user.id == id);
    // if (data) {
    //   delete userData[data.id];
    //   fs.writeFile(
    //     "./MOCK_DATA.json",
    //     JSON.stringify(userData),
    //     (err, data) => {
    //       return res.json({ status: "Deleted" });
    //     }
    //   );
    // } else {
    //   res.status(404).json({ status: "not deleted" });
    // }

    return res.json({ status: "working" });
  });
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
