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

async function updateProject(project){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('proyectos')
        .replaceOne(
            {_id: new objectId(project._id)},
            {
                nombre: project.nombre,
                equipo_id: project.equipo,
                tickets: project.tickets,
                progreso: project.tickets,
                completado: project.completado,
                manager_id: project.manager_id
                
            })

    return result;
}

module.exports = { getProjects, newProject, updateProject }