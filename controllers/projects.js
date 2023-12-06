const projects = require('../data/projects');

async function getProjects() {
    return projects.getProjects();
}

async function newProject(project) {
    return projects.newProject(project);
}

async function updateProject(id, project) {
    return projects.updateProject(id, project);
}

async function addProjectManager(id, manager) {
    return projects.addProjectManager(id, manager);
}

async function getTickets() {
    return projects.getTickets();
}


async function getTicket(id) {
    return projects.getTicket(id);
}


async function getTeam(id){
    return projects.getTeam(id);
}


async function removeFromAllTeams(id) {
    return projects.removeFromAllTeams(id);
}


async function getProject(id) {
    return projects.getProject(id);
}

async function getAllTeams() {
        return projects.getAllTeams();
}

async function addTeamMember(id, member) {
    return projects.addTeamMember(id, member);
}

async function removeTeamMember(id, memberId) {
    return projects.removeTeamMember(id, memberId);
}

async function addTicketToProject(id, ticket) {
    return projects.addTicketToProject(id, ticket);
}

async function removeTicketFromProject(id, ticketId) {
    return projects.removeTicketFromProject(id, ticketId);
}

async function updateTicket(id, ticketId, ticket) {
    return projects.updateTicket(id, ticketId, ticket);
}

async function findProjects(manager, completed, page, size) {
    return projects.findProjects(manager, completed, page, size);
}

async function findTickets(dev) {
    return projects.findTickets(dev);
}

async function deleteProject(id) {
    return projects.deleteProject(id);
}

module.exports = { getProjects, newProject, updateProject, addProjectManager, getTickets, getTicket, findTickets, getTeam, removeFromAllTeams,
     getProject, findProjects, getAllTeams, addTeamMember, removeTeamMember, addTicketToProject, removeTicketFromProject, updateTicket, deleteProject }