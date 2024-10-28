const { Router } = require("express");
const {
  handleSignup,
  handleSignin,
  handleFileUpload,
} = require("../controllers/user");
const router = Router();

// GET Routes
router.get("/signup", (req, res) => {
  res.render("signup");
});
router.get("/signin", (req, res) => {
  res.render("signin");
});
router.get("/logout", (req, res) => {
  res.clearCookie("blogwebsite").redirect("/");
});

// POST Routes
router.post("/signin", handleSignin);
router.post("/signup", handleSignup);

module.exports = router;
