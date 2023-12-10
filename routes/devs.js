const express = require("express");
const router = express.Router();
const controller = require("./../controllers/devs");

router.get("/", async (req, res, next) => {
  const devs = await controller.getDevs();
  res.json(devs);
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const dev = await controller.getDev(id);
  res.json(dev);
});

router.post("/", async (req, res) => {
  const dev = req.body;
  const result = await controller.newDev(dev);
  res.json(result);
});

router.put("/:id", async (req, res) => {
  const dev = req.body;
  const result = await controller.updateDev(req.params.id, dev);
  res.json(result);
});

router.delete('/:id', async(req, res) => {
  const result = await controller.deleteDev(req.params.id)
  res.json(result)

})

module.exports = router;
