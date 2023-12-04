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

async function updateProjectName(name, id) {
    return projects.updateProjectName(name, id);
}

async function updateProjectProgress(project, id) {
    return projects.updateProjectProgress(project, id);
}

async function updateProjectManager(manager, id) {
    return projects.updateProjectManager(manager, id);
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

async function updateTeamName(team, id) {
    return projects.updateTeamName(team, id);
}

async function addTeamMember(team, id) {
    return projects.addTeamMember(team, id);
}

async function removeTeamMember(team, id) {
    return projects.removeTeamMember(team, id);
}

async function addTicketToProject(ticket, id) {
    return projects.addTicketToProject(ticket, id);
}

async function removeTicketFromProject(ticket, id) {
    return projects.removeTicketFromProject(ticket, id);
}

async function updateTicket(ticket, id) {
    return projects.updateTicket(ticket, id);
}

async function deleteProject(id) {
    return projects.deleteProject(id);
}

module.exports = { getProjects, newProject, updateProjectData, updateProjectName, updateProjectProgress, updateProjectManager, getTickets, getTicket, getTeam, removeFromAllTeams,
     getProject, getAllTeams, updateTeamName, addTeamMember, removeTeamMember, addTicketToProject, removeTicketFromProject, updateTicket, deleteProject }