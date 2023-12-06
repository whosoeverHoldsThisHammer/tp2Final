const express = require('express');
const router = express.Router();
const controller = require('./../controllers/projects');

// get all projects
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

// find project
router.get('/find/bymanager/:id', async(req, res) => {
  const page = req.query.page ? parseInt(req.query.page): 0;
  const size = req.query.size ? parseInt(req.query.size): 0;

  const projects = await controller.findProjects(req.params.id, req.query.completed, page, size);
  res.json(projects);
});

// update project
router.put('/:id', async(req, res) => {
  const project = req.body;
  const result = await controller.updateProject(req.params.id, project)
  res.json(result)
})

// update project manager
router.put('/:id/manager', async(req, res) => {
  const manager = req.body;
  const result = await controller.addProjectManager(req.params.id, manager)
  res.json(result)
})

// get all tickets
router.get('/tickets', async(req, res, next) => {
  const tickets = await controller.getTickets();
  res.json(tickets);
});

// find tickets
router.get('/tickets/find/bydeveloper/:id', async(req, res) => {
  const projects = await controller.findTickets(req.params.id);
  res.json(projects);
});


// get team
router.get('/:id/members', async(req, res, next) => {
  //const name = req.params.name.replace('_', ' ');
  const team = await controller.getTeam(req.params.id);
  res.json(team);
});

// remove dev from teams
router.delete('/teams/:id/all', async(req, res) => {
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
router.put('/:id/tickets/:ticketId', async(req, res) => {
  const ticket = req.body;
  const result = await controller.updateTicket(req.params.id, req.params.ticketId, ticket)
  res.json(result)
})

// add ticket to project
router.post('/:id/tickets', async(req, res) => {
  const ticket = req.body;
  const result = await controller.addTicketToProject(req.params.id, ticket)
  res.json(result)
})

// remove ticket from project
router.delete('/:id/tickets/:ticket', async(req, res) => {
  const result = await controller.removeTicketFromProject(req.params.id, req.params.ticket)
  res.json(result)
})


// add team member
router.post('/:id/members', async(req, res) => {
  const member = req.body;
  const result = await controller.addTeamMember(req.params.id, member)
  res.json(result)
})

// remove team member
router.delete('/:id/members/:memberId', async(req, res) => {
  //const member = req.body;
  const result = await controller.removeTeamMember(req.params.id, req.params.memberId)
  res.json(result)
})

// delete project
router.delete('/:id', async(req, res) => {
  const result = await controller.deleteProject(req.params.id)
  res.json(result)
})

//get ticket by id
router.get('/tickets/:id', async(req, res, next) => {
  const id = req.params.id;
  const ticket = await controller.getTicket(id);
  res.json(ticket);
});

module.exports = router;
