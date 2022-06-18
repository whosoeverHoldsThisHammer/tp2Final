const express = require('express');
const router = express.Router();
const data = require('./../data/devs');

router.get('/', async(req, res, next) => {
  const devs = await data.getDevs()
  res.json(devs);
})

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const dev = await data.getDev(id);
  res.json(dev);
})

router.post('/', async(req, res) => {
  const dev = req.body;
  const result = await data.newDev(dev);
  res.json(result)
})

router.put('/', async(req, res) => {
  const dev = req.body;
  const result = await data.updateDev(dev);
  res.json(result)
})

module.exports = router;
