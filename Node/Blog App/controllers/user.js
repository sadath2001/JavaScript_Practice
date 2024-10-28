const { User } = require("../models/user");

async function handleSignup(req, res) {
  if (req.body) {
    const { fullName, email, password } = req.body;
    await User.create({
      fullName,
      email,
      password,
    });
    return res.redirect("/");
  }
  return res.redirect("/signup");
}

async function handleSignin(req, res) {
  try {
    const { email, password } = req.body;
    const token = await User.matchPasswordAndGenerateToken(email, password);
    return res.cookie("blogwebsite", token).redirect("/");
  } catch (error) {
    return res.render("signin", {
      error: "Incorrect email or password",
    });
  }
}

async function handleFileUpload(req, res) {
  return res.send("hi");
}

module.exports = {
  handleSignup,
  handleSignin,
  handleFileUpload,
};
