const connection = require('./conn')
const objectId = require('mongodb').ObjectId;

async function getProjects(){
    const clientMongo = await connection.getConnection();
    const projects = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .find()
        .toArray()
    
    return projects;
}

async function newProject(project){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .insertOne(project);

    return result;
}

async function updateProjectData(project){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(project._id)},
            { $set: {
                nombre: project.nombre,
                progreso: project.progreso,
                completado: project.completado
                }
            }
        )

    return result;
}


async function getTickets(){
    const clientMongo = await connection.getConnection();
    const tickets = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .find().project({ tickets: 1 })
        .toArray()
    
    return tickets;
}


async function getTeam(name){
    const clientMongo = await connection.getConnection();
    const team = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .find( { 'equipo.nombre' : name})
        .toArray()
    
    return team;
}


async function removeTeamMemeber(team_id, user_id){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .updateMany(
            {_id: new objectId(team_id)},
            { $pull:
                {
                    'equipo.desarrolladores': { _id: new objectId(user_id) }
                }
            }
        )

    return result;
}


async function removeFromAllTeams(id){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
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

async function unassignFromAllTickets(id){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .updateMany(
            {'tickets.desarrollador_id': { _id: new objectId(id) } },
            { $set:
                {
                    'tickets.$.desarrollador_id' : ""
                }
            }
        )

    return result;
}

async function getProject(id){
    const clientMongo = await connection.getConnection();
    const project = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .findOne({_id: new objectId(id)})

    return project;
}

async function getAllTeams(){
    const clientMongo = await connection.getConnection();
    const teams = await clientMongo
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

async function updateTeam(team, id){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')       
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                "equipo.nombre" : team.nombre,
                "equipo.desarrolladores" : team.desarrolladores
                }
            }
        )
    return result;
}

async function updateTicket(ticket, id){
    console.log(ticket)
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                "ticket.nombre": ticket.nombre,
                "ticket.descripcion": ticket.descripcion,
                "ticket.completado": ticket.completado,
                "ticket.dificultad": ticket.dificultad,
                "ticket.prioridad": ticket.prioridad,
                "ticket.nombre": ticket.nombre,
                "ticket.proyecto_id": ticket.proyecto_id,
                "ticket.desarrollador_id": ticket.desarrollador_id
                }
            }
        )
    return result;
}


module.exports = { getProjects, newProject, updateProjectData, getTickets, getTeam, removeTeamMemeber, removeFromAllTeams, unassignFromAllTickets, getProject, getAllTeams, updateTeam, updateTicket }