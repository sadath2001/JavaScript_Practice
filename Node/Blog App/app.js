const express = require("express");
const { connectDatabase } = require("./connection");
const { checkforAuthCookie } = require("./middleware/authentication");

const userRoute = require("./routes/user");
const blogRoute = require("./routes/blog");
const cookieParser = require("cookie-parser");
const path = require("path");
const Blog = require("./models/blog");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 8000;
const dbURL = process.env.DB_URL;

// DB Connection
connectDatabase(dbURL);

// Config
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Middleware - to handle form-data
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkforAuthCookie("blogwebsite"));
app.use(express.static(path.resolve("./public")));

// Routes
app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({}).sort({ createdAt: -1 });
  return res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);
app.use("/blog", blogRoute);

// Serve
app.listen(port, () => console.log("Server running on: " + port));
