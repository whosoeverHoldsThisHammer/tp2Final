const connection = require('./conn')
const objectId = require('mongodb').ObjectId;

async function getProjects(){
    const connectiondb = await connection.getConnection();
    const projects = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find()
        .toArray()
    
    return projects;
}

async function newProject(project){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .insertOne(project);

    return result;
}

async function updateProjectData(project){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(project._id)},
            { $set: {
                nombre: project.nombre,
                progreso: project.progreso,
                completado: project.completado,
                manager: project.manager
                }
            }
        )

    return result;
}

async function updateProjectName(name, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                nombre: name
                }
            }
        )

    return result;
}

async function updateProjectProgress(project, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                progreso: project.progreso,
                completado: project.completado,
                }
            }
        )

    return result;
}

async function updateProjectManager(manager, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                manager: manager
                }
            }
        )

    return result;
}

async function getTickets(){
    const connectiondb = await connection.getConnection();
    const tickets = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find().project({nombre: 1, tickets: 1 })
        .toArray()
    
    return tickets;
}


async function getTicket(id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find(
            {"tickets._id": new objectId(id)},
            {
                projection: {
                    tickets: { $elemMatch: { _id: new objectId(id) } }
                },
            }
        )
        .toArray();

    return result;
}



async function getTeam(name){
    const connectiondb = await connection.getConnection();
    const team = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find( { 'equipo.nombre' : name}).project({ 'equipo.nombre': 1, "equipo.desarrolladores": 1})
        .toArray()
    
    return team;
}


async function removeFromAllTeams(id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateMany(
            {},
            { $pull:
                {
                   'equipo.desarrolladores': { _id: new objectId(id) }
                }
            }
        )

    return result;
}


async function getProject(id){
    const connectiondb = await connection.getConnection();
    const project = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .findOne({_id: new objectId(id)})

    return project;
}

async function getAllTeams(){
    const connectiondb = await connection.getConnection();
    const teams = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find({})
        .map((proyecto)=>({
            nombre: proyecto.equipo.nombre,
            desarrolladores: proyecto.equipo.desarrolladores,         
        }))
        .toArray()

        return teams;
}

async function updateTeamName(team, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')       
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                "equipo.nombre" : team.nombre,
                //"equipo.desarrolladores" : team.desarrolladores
                }
            }
        )
    return result;
}

async function addTeamMember(member, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(id) },
            { $push: { 
                "equipo.desarrolladores": {
                    "_id": new objectId(), 
                    "nombre" : member.nombre
                }
            }}                  
        )
    return result;
}

async function removeTeamMember(member, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(id) },
            { $pull: { 
                "equipo.desarrolladores": {
                    "_id": new objectId(member._id), 
                    "nombre" : member.nombre
                }
            }}                  
        )
    return result;
}

async function addTicketToProject(ticket, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(id) },
            { $push: { tickets: {
                "_id": new objectId(ticket._id), 
                "nombre" : ticket.nombre,
                "descripcion": ticket.descripcion,
                "completado": ticket.completado,
                "dificultad": ticket.dificultad,
                "prioridad": ticket.prioridad,
                "desarrollador_id": ticket.desarrollador_id
            }}}                  
        )
    return result;
}

async function removeTicketFromProject(ticket, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(id) },
            { $pull: { tickets: {
                "_id": new objectId(ticket._id),
                "nombre" : ticket.nombre,
                "descripcion": ticket.descripcion,
                "completado": ticket.completado,
                "dificultad": ticket.dificultad,
                "prioridad": ticket.prioridad,
                "desarrollador_id": ticket.desarrollador_id 
            }}}
        )
        
    return result;
}

async function updateTicket(ticket, id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
          {"tickets._id": new objectId(id)},
            { $set: {
                "tickets.$.nombre": ticket.nombre,
                "tickets.$.descripcion": ticket.descripcion,
                "tickets.$.completado": ticket.completado,
                "tickets.$.dificultad": ticket.dificultad,
                "tickets.$.prioridad": ticket.prioridad,
                "tickets.$.nombre": ticket.nombre,
                "tickets.$.desarrollador_id": ticket.desarrollador_id
                }
            }                   
        )
    return result;
}

async function deleteProject(id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .deleteOne({_id: new objectId(id)})

    return result;
}


module.exports = {
    getProjects, newProject, updateProjectData, updateProjectName, updateProjectProgress, updateProjectManager, getTickets, getTicket, addTicketToProject, removeTicketFromProject,
    getTeam, addTeamMember, removeTeamMember, removeFromAllTeams, getProject, getAllTeams, updateTeamName, updateTicket, deleteProject }