const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user");

router.get("/static/users", getAllUsers);

module.exports = { router };
