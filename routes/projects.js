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


router.put('/update', async(req, res) => {
  const project = req.body;
  const result = await data.updateProjectData(project)
  res.json(result)
})


router.get('/tickets', async(req, res, next) => {
  const tickets = await data.getTickets();
  res.json(tickets);
});

router.get('/team/:name', async(req, res, next) => {
  const name = req.params.name.replaceAll('_', ' ');
  const team = await data.getTeam(name);
  res.json(team);
});

module.exports = router;
