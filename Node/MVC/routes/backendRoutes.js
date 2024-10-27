const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user");

router.get("/static/users", getAllUsers);

router.get("/", async (req, res) => {
  const userData = await User.find({});
  return res.json(userData);
});
router.post("/api/users", async (req, res) => {
  const body = req.body;
  const result = await User.create(body);
  if (result) {
    return res.status(201).json(result);
  }
});
router
  .route("/:id")
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
