const connection = require('./conn')

async function getTeams(){
    const clientMongo = await connection.getConnection();
    const teams = await clientMongo
        .db('tp2_final')
        .collection('equipos')
        .find()
        .toArray()
    
    return teams;
}


module.exports = { getTeams } 