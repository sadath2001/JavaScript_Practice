const cluster = require("node:cluster");
const os = require("os");
const express = require("express");
const app = express();
const totalCPUs = os.cpus().length;

// basically load balancing the server load

// doc: https://nodejs.org/api/cluster.html
if (cluster.isPrimary) {
  for (let i = 0; i < totalCPUs; i++) {
    cluster.fork();
  }
} else {
  app.get("/", (req, res) => res.end("served by: " + process.pid));
  app.listen(8002, () => console.log("running on port 8000"));
}
