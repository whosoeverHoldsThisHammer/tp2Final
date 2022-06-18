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


module.exports = { getProjects, newProject, updateProjectData, getTickets, getTeam }