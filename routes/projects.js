const express = require('express');
const router = express.Router();
const controller = require('./../controllers/projects');

router.get('/', async(req, res, next) => {
  const projects = await controller.getProjects();
  res.json(projects);
});

router.post('/', async(req, res) =>{
  const project = req.body;
  const result = await controller.newProject(project);
  res.json(result)
})


router.put('/updateProject/', async(req, res) => {
  const project = req.body;
  const result = await controller.updateProjectData(project)
  res.json(result)
})


router.get('/tickets', async(req, res, next) => {
  const tickets = await controller.getTickets();
  res.json(tickets);
});

router.get('/ticket/:id', async(req, res, next) => {
  const id = req.params.id;
  const ticket = await controller.getTicket(id);
  res.json(ticket);
});

router.get('/team/:name', async(req, res, next) => {
  const name = req.params.name.replaceAll('_', ' ');
  const team = await controller.getTeam(name);
  res.json(team);
});


router.put('/team/remove/:team_id/:user_id', async(req, res) => {
  const team_id = req.params.team_id;
  const user_id = req.params.user_id;
  const result = await controller.removeTeamMemeber(team_id, user_id);
  res.json(result);
});


router.put('/removeFromAllTeams/:id', async(req, res) => {
  const id = req.params.id;
  const result = await controller.removeFromAllTeams(id);
  res.json(result);
});


router.put('/unassignFromAllTickets/:id', async(req, res) => {
  const id = req.params.id;
  const result = await controller.unassignFromAllTickets(id);
  res.json(result);
});

router.get('/teams', async(req, res, next) => {
  const teams = await controller.getAllTeams();
  res.json(teams);
});

router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const project = await controller.getProject(id);
  res.json(project);
});

router.put('/updateTicket/:id', async(req, res) => {
  const ticket = req.body;
  const result = await controller.updateTicket(ticket, req.params.id)
  res.json(result)
})

router.put('/updateTeam/:id', async(req, res) => {
  const team = req.body;
  const result = await controller.updateTeam(team, req.params.id)
  res.json(result)
})

router.delete('/:id', async(req, res) => {
  const result = await controller.deleteProject(req.params.id)
  res.json(result)
})


module.exports = router;
