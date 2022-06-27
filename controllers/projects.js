const projects = require('../data/projects');

async function getProjects() {
    return projects.getProjects();
}

async function newProject(project) {
    return projects.newProject(project);
}

async function updateProject(project) {
    return projects.updateProject(project);
}


async function getTickets() {
    return projects.getTickets();
}


async function getTicket(id) {
    return projects.getTickets(id);
}


async function getTeam(name){
    return projects.getTeam(name);
}


async function removeTeamMember(team_id, user_id) {
    return projects.removeTeamMember(team_id, user_id);
}


async function removeFromAllTeams(id) {
    return projects.removeFromAllTeams(id);
}

async function unassignFromAllTickets(id) {
    return projects.unassignFromAllTickets(id);
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

module.exports = { getProjects, newProject, updateProject, getTickets, getTicket, getTeam, removeTeamMember, removeFromAllTeams,
    unassignFromAllTickets, getProject, getAllTeams, updateTeam, updateTicket, deleteProject }