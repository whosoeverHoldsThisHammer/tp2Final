const connection = require('./conn')


async function getManagers(){
    const clientMongo = await connection.getConnection();
    const manager = await clientMongo
        .db('tp2_final')
        .collection('managers')
        .find()
        .toArray()
    
    return manager;
}


module.exports = { getManagers } 