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
                completado: project.completado,
                manager: project.manager
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
        .find().project({nombre: 1, tickets: 1 })
        .toArray()
    
    return tickets;
}


async function getTicket(id){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
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
    const clientMongo = await connection.getConnection();
    const team = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .find( { 'equipo.nombre' : name}).project({ 'equipo.nombre': 1, "equipo.desarrolladores": 1})
        .toArray()
    
    return team;
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
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .deleteOne({_id: new objectId(id)})

    return result;
}


module.exports = { getProjects, newProject, updateProjectData, getTickets, getTicket, getTeam, removeFromAllTeams,
     getProject, getAllTeams, updateTeam, updateTicket, deleteProject }