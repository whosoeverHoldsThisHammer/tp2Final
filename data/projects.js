const connection = require('./conn')

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

async function updateProject(){

}

module.exports = { getProjects, newProject, updateProject }