const express = require("express");
const router = express.Router();
const controller = require("./../controllers/users");
const auth = require("./../middlewares/Auth");

router.get("/", auth,  async function (req, res, next) {
  const users = await controller.getAllUsers();
  res.json(users);
});

router.post("/", auth, async (req, res) => {
  const user = req.body;
  const result = await controller.addUser(user);
  res.status(201).json(result);
});

router.post("/login", async (req, res) => {
  try {
    const user = await controller.findByCredential(req.body.email, req.body.password);
    const token = controller.generateToken(user);
    res.send({ user, token });
  } catch (error) {
    console.log(error);
    res.status(401).send(error.message);
  }
});
module.exports = router;
