const express = require("express");
const router = express.Router();
const controller = require("./../controllers/managers");

router.get("/", async (req, res, next) => {
  const managers = await controller.getAllManagers();
  res.json(managers);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const manager = await controller.getManager(id);
  res.json(manager);
});

router.post("/", async (req, res) => {
  const manager = req.body;
  const result = await controller.newManager(manager);
  res.json(result);
});

router.put("/", async (req, res) => {
  const manager = req.body;
  const result = await manager.updateManager(manager);
  res.json(result);
});

router.delete('/:id', async(req, res) => {
  const result = await controller.deleteManager(req.params.id)
  res.json(result)

})

module.exports = router;