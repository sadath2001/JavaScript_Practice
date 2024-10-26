const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 8000;
// data generate from https://www.mockaroo.com/
// Hybrid server
const dbURL = "mongodb://127.0.0.1:27017/test_data";
mongoose
  .connect(dbURL)
  .then(() => console.log("Mongodo server started"))
  .catch((err) => console.log("cannot connect: ", err));
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    designation: {
      type: String,
    },
  },
  { timestamps: true }
);
const User = mongoose.model("user", userSchema);
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

app.get("/users", async (req, res) => {
  const userData = await User.find({});
  const data = userData.map((i) => `<li>${i.firstName}</li>`).join("");
  return res.send(`<ul>${data}</ul>`);
});

app.get("/api/users", async (req, res) => {
  const userData = await User.find({});
  return res.json(userData);
});
app.post("/api/users", async (req, res) => {
  const body = req.body;
  const result = await User.create(body);
  if (result) {
    return res.status(201).json(result);
  }
});
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const data = await User.findById(req.params.id);
    if (data) {
      return res.status(200).json(data);
    } else {
      return res.status(404).json({ message: "Not found" });
    }
  })
  .patch(async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    const data = await User.findByIdAndUpdate(id, body);
    if (data) {
      return res.status(201).json({ status: "Updated" });
    } else {
      return res.status(404).json({ status: "Doesnt exist" });
    }
  })
  .delete(async (req, res) => {
    const id = req.params.id;
    const data = await User.findOneAndDelete(id);
    if (data) {
      res.status(200).json({ status: "deleted", data: data });
    } else {
      res.status(404).json({ status: "not deleted" });
    }
  });
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
