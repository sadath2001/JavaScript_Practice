const express = require("express");
const multer = require("multer"); // file uploading functionality
const path = require("path");
const app = express();
const port = 8000;

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// basically helps to handle parse the form data since we usually except json
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  return res.render("homepage");
});

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()} - ${file.originalname} `;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("imageUpload"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  return res.redirect("/");
});
app.listen(port, () => console.log("port running on: " + port));
