const express = require("express");
const http = require("http");
const app = express();
const { join } = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const port = 8000;

// To serve static content - doesnt matter as long as you have index.html under public
app.use(express.static("./public"));
const io = new Server(server);
io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("user-message", (message) => {
    // console.log(`message from client: ${message}`);
    io.emit("server-message", message);
  });
});
// Routes
app.get("/", (req, res) => {
  res.sendFile("./public/index.html");
});
server.listen(port, () => {
  console.log(`Server running on: ${port}`);
});
