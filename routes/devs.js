const express = require('express');
const router = express.Router();
const data = require('./../data/devs');

router.get('/', async(req, res, next) => {
  const devs = await data.getDevs()
  res.json(devs);
});

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
