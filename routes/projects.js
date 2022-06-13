const express = require('express');
const router = express.Router();
const data = require('./../data/projects');

router.get('/', async(req, res, next) => {
  const projects = await data.getProjects();
  res.json(projects);
});

router.post('/', async(req, res) =>{
  const project = req.body;
  const result = await data.newProject(project);
  res.json(result)
})

module.exports = router;
