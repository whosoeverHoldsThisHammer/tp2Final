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

async function getProjectsByManager(id){
    console.log(id)
    const connectiondb = await connection.getConnection();
    const projects = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find({
            "manager._id": new objectId(id)
        })
        .toArray()
    
    return projects;
}

async function findProjects(managerId, completado, page, size){
    let query = {}
    query["manager._id"] = new objectId(managerId)

    if(completado){
        query = {$and: [
            {"manager._id": new objectId(managerId)},
            {"completado": completado == 'true' ? Boolean('true') : Boolean() }
        ]}
    }

    const connectiondb = await connection.getConnection();
    const projects = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find(query)
        .limit(size)
        .skip(page * size)
        .toArray()
    
    return projects;
}

async function findTickets(devId){
    const connectiondb = await connection.getConnection();
    const projects = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .aggregate([
            { $match: { 'tickets.desarrollador_id': new objectId(devId) } },
            {
              $project: {
                _id: 1,
                nombre: 1,
                tickets: {
                  $filter: {
                    input: '$tickets',
                    as: 'ticket',
                    cond: { $eq: ['$$ticket.desarrollador_id', new objectId(devId)] },
                  },
                },
              },
            }
          ])
          .toArray();
        
    return projects;
}

async function updateProject(id, project){

    project.equipo.desarrolladores !== undefined
    ? project.equipo.desarrolladores.forEach(desarrollador => desarrollador._id = new objectId(desarrollador._id))
    : null

    project.tickets.length > 0
    ? project.tickets.forEach(ticket => {
        ticket._id = new objectId(ticket._id)
        ticket.desarrollador_id !== "" 
        ? ticket.desarrollador_id = new objectId(ticket.desarrollador_id)
        : null
    })
    : null
    
    project.manager._id !== undefined ? project.manager._id = new objectId(project.manager._id) : null

    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                nombre: project.nombre,
                progreso: project.progreso,
                equipo: project.equipo,
                tickets: project.tickets,
                completado: project.completado,
                manager: project.manager
                }
            }
        )

    return result;
}


async function addProjectManager(id, manager){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                manager: {
                    _id: new objectId(manager._id),
                    nombre: manager.nombre
                }
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



async function getTeam(id){
    const connectiondb = await connection.getConnection();
    const team = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .find( { '_id' : new objectId(id)}).project({ 'equipo.nombre': 1, "equipo.desarrolladores": 1})
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

async function addTeamMember(id, member){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(id) },
            { $push: { 
                "equipo.desarrolladores": {
                    "_id": new objectId(member._id), 
                    "nombre" : member.nombre
                }
            }}                  
        )
    return result;
}

async function removeTeamMember(projectId, memberId){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(projectId) },
            { $pull: { 
                "equipo.desarrolladores": {
                    "_id": new objectId(memberId),
                }
            }}                  
        )
    return result;
}

async function addTicketToProject(id, ticket){
    console.log()
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(id) },
            { $push: { tickets: {
                "_id": new objectId(), 
                "nombre": ticket.nombre,
                "descripcion": ticket.descripcion,
                "completado": ticket.completado,
                "dificultad": ticket.dificultad,
                "prioridad": ticket.prioridad,
                "desarrollador_id": ticket.desarrollador_id !== "" ? new objectId(ticket.desarrollador_id) : ticket.desarrollador_id
            }}}                  
        )
    return result;
}

async function removeTicketFromProject(id, ticketId){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            { _id: new objectId(id) },
            { $pull: { tickets: {
                "_id": new objectId(ticketId),
            }}}
        )
        
    return result;
}

async function updateTicket(id, ticketId, ticket){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
          { "_id": new objectId(id),
            "tickets._id": new objectId(ticketId)},
            { $set: {
                "tickets.$.nombre": ticket.nombre,
                "tickets.$.descripcion": ticket.descripcion,
                "tickets.$.completado": ticket.completado,
                "tickets.$.dificultad": ticket.dificultad,
                "tickets.$.prioridad": ticket.prioridad,
                "tickets.$.nombre": ticket.nombre,
                "tickets.$.desarrollador_id": ticket.desarrollador_id !== "" ? new objectId(ticket.desarrollador_id) : ticket.desarrollador_id
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
    getProjects, newProject, findProjects, updateProject, addProjectManager, getTickets, getTicket, addTicketToProject, removeTicketFromProject,
    findTickets, getTeam, addTeamMember, removeTeamMember, removeFromAllTeams, getProject, getAllTeams, updateTicket, deleteProject }