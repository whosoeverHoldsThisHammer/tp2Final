const connection = require('./conn')
const objectId = require('mongodb').ObjectId;

async function getTickets(desarrollador_id, proyecto_id){
    const query = {};
    (desarrollador_id) ? (query.desarrollador_id = desarrollador_id) : "";
    (proyecto_id) ? (query.proyecto_id = proyecto_id) : "";

    const clientMongo = await connection.getConnection();
    const tickets = await clientMongo
        .db('tp2_final')
        .collection('tickets')
        .find(query)
        .toArray()
    
    return tickets;
}

async function getTicket(id){
    const clientMongo = await connection.getConnection();
    const ticket = await clientMongo
        .db('tp2_final')
        .collection('tickets')
        .findOne({_id: new objectId(id)})
    
    return ticket;
}

module.exports = { getTickets, getTicket }