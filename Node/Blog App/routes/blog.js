const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const { createBlog, getBlogById, commentBlog } = require("../controllers/blog");
const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const fileName = file.originalname;
    cb(null, uniqueSuffix + "-" + fileName);
  },
});

const upload = multer({ storage: storage });

// GET Routes
router.get("/add_blog", (req, res) => {
  res.render("addBlog", {
    user: req.user,
  });
});

router.get("/:id", getBlogById);

// POST Routes
router.post("/", upload.single("coverImage"), createBlog);
router.post("/comment/:blogId", commentBlog);

module.exports = router;
