const projects = require('../data/projects');

async function getProjects() {
    return projects.getProjects();
}

async function newProject(project) {
    return projects.newProject(project);
}

async function updateProjectData(project) {
    return projects.updateProjectData(project);
}


async function getTickets() {
    return projects.getTickets();
}


async function getTicket(id) {
    return projects.getTicket(id);
}


async function getTeam(name){
    return projects.getTeam(name);
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

async function updateTeam(team, id) {
    return projects.updateTeam(team, id);
}

async function updateTicket(ticket, id) {
    return projects.updateTicket(ticket, id);
}

async function deleteProject(id) {
    return projects.deleteProject(id);
}

module.exports = { getProjects, newProject, updateProjectData, getTickets, getTicket, getTeam, removeFromAllTeams,
     getProject, getAllTeams, updateTeam, updateTicket, deleteProject }