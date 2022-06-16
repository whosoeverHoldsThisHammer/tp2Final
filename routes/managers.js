const express = require('express');
const router = express.Router();
const data = require('../data/managers');

router.get('/', async(req, res, next) => {
  const managers = await data.getManagers()
  res.json(managers);
});


module.exports = router;