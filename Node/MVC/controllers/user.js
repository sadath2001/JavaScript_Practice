const { User } = require("../models/user");

async function getAllUsers(req, res) {
  const userData = await User.find({});
  const data = userData.map((i) => `<li>${i.firstName}</li>`).join("");
  return res.send(`<ul>${data}</ul>`);
}

module.exports = {
  getAllUsers,
};
