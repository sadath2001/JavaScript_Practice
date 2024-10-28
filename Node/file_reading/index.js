const express = require("express");
const app = express();
const port = 8000;
const fs = require("fs");
const zlib = require("zlib");
const monitor = require("express-status-monitor");
app.use(monitor());

// using streams
// app.get("/", (req, res) => {
//   const stream = fs.createReadStream("./sample.csv", "utf-8");
//   stream.on("data", (chunks) => res.write(chunks));
//   stream.on("end", () => res.end());
// });

app.get("/zip", (req, res) => {
  fs.createReadStream("./example.txt").pipe(
    zlib.createGzip().pipe(fs.createWriteStream("./example.zip"))
  );
  res.end("done");
});
app.listen(port, () => console.log("app running on: " + port));
