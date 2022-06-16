const connection = require('./conn')
const objectId = require('mongodb').ObjectId;

async function getTickets(completado, criterio, orden){
    const query = {};
    (completado) ? (query.completado = completado.toLowerCase() === 'true') : "";

    const sort = {};
    const sortOrder = (orden == 'DES') ? -1 : 1;
    (criterio) ? (sort[criterio] = sortOrder) : ""

    const clientMongo = await connection.getConnection();
    const tickets = await clientMongo
        .db('tp2_final')
        .collection('tickets')
        .find(query).sort(sort)
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

async function getDevTickets(id){
    console.log(id)
    const clientMongo = await connection.getConnection();
    const tickets = await clientMongo
        .db('tp2_final')
        .collection('tickets')
        .find({desarrollador_id: new objectId(id)})
    
    return tickets
}

module.exports = { getTickets, getTicket, getDevTickets}