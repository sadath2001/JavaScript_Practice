const express = require("express");
const app = express();
// this is my handler code if written in node js manually
// to solve lot of manual stuff we use express

// const server = http.createServer(app);
app.get("/", (req, res) => {
  return res.send("Hello from home");
});

app.get("/about", (req, res) => {
  return res.send(`Hello ${req.query.name}, you are now ${req.query.age}`);
});
app.listen(8010, (failure, success) => {
  if (failure) console.log("server start failed: ", failure);
  else console.log("Server Started");
});
