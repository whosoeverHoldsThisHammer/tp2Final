const express = require('express');
const router = express.Router();
const controller = require('./../controllers/projects');

// getall projects
router.get('/', async(req, res, next) => {
  const projects = await controller.getProjects();
  res.json(projects);
});

// new project
router.post('/', async(req, res) =>{
  const project = req.body;
  const result = await controller.newProject(project);
  res.json(result)
})

// update project data
router.put('/updateProject/', async(req, res) => {
  const project = req.body;
  const result = await controller.updateProjectData(project)
  res.json(result)
})

// update project name
router.put('/updateProjectName/:id', async(req, res) => {
  const name = req.body.nombre;
  const result = await controller.updateProjectName(name, req.params.id)
  res.json(result)
})

// update project progress
router.put('/updateProjectProgress/:id', async(req, res) => {
  const project = req.body;
  const result = await controller.updateProjectProgress(project, req.params.id)
  res.json(result)
})

// update project manager
router.put('/updateProjectManager/:id', async(req, res) => {
  const manager = req.body;
  const result = await controller.updateProjectManager(manager, req.params.id)
  res.json(result)
})

// get all tickets
router.get('/tickets', async(req, res, next) => {
  const tickets = await controller.getTickets();
  res.json(tickets);
});


// get team by name
router.get('/team/:name', async(req, res, next) => {
  const name = req.params.name.replace('_', ' ');
  const team = await controller.getTeam(name);
  res.json(team);
});

// remove dev from teams
router.put('/removeFromAllTeams/:id', async(req, res) => {
  const id = req.params.id;
  const result = await controller.removeFromAllTeams(id);
  res.json(result);
});


// get all teams
router.get('/teams', async(req, res, next) => {
  const teams = await controller.getAllTeams();
  res.json(teams);
});

// get project by id
router.get('/:id', async(req, res) => {
  const id = req.params.id;
  const project = await controller.getProject(id);
  res.json(project);
});

// update ticket
router.put('/updateTicket/:id', async(req, res) => {
  const ticket = req.body;
  const result = await controller.updateTicket(ticket, req.params.id)
  res.json(result)
})

// add ticket to project
router.put('/addTicketToProject/:id', async(req, res) => {
  const ticket = req.body;
  const result = await controller.addTicketToProject(ticket, req.params.id)
  res.json(result)
})

// remove ticket from project
router.put('/removeTicketFromProject/:id', async(req, res) => {
  const ticket = req.body;
  const result = await controller.removeTicketFromProject(ticket, req.params.id)
  res.json(result)
})

// update team name
router.put('/updateTeamName/:id', async(req, res) => {
  const team = req.body;
  const result = await controller.updateTeamName(team, req.params.id)
  res.json(result)
})

// add team member
router.put('/addTeamMember/:id', async(req, res) => {
  const member = req.body;
  const result = await controller.addTeamMember(member, req.params.id)
  res.json(result)
})

// remove team member
router.put('/removeTeamMember/:id', async(req, res) => {
  const member = req.body;
  const result = await controller.removeTeamMember(member, req.params.id)
  res.json(result)
})

// delete project
router.delete('/:id', async(req, res) => {
  const result = await controller.deleteProject(req.params.id)
  res.json(result)
})

//get ticket by id
router.get('/ticket/:id', async(req, res, next) => {
  const id = req.params.id;
  const ticket = await controller.getTicket(id);
  res.json(ticket);
});

module.exports = router;
