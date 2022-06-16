const express = require('express');
const router = express.Router();
const data = require('./../data/teams');

router.get('/', async(req, res, next) => {
  const teams = await data.getTeams();
  res.json(teams);
});



module.exports = router;