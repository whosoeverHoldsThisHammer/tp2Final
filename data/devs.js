const connection = require('./conn')
const objectId = require('mongodb').ObjectId;

async function getDevs(){
    const clientMongo = await connection.getConnection();
    const devs = await clientMongo
        .db('tp2_final')
        .collection('desarrolladores')
        .find()
        .toArray()
    
    return devs;
}

async function newDev(dev){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('desarrolladores')
        .insertOne(dev);

    return result;
}

async function updateDev(dev){
    console.log(dev)
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('desarrolladores')
        .updateOne(
            {_id: new objectId(dev._id)},
            { $set: {
                nombre: dev.nombre,
                equipo_id: dev.equipo_id,
                proyecto_id: dev.proyecto_id
                }
            }
        )

    return result;
}

module.exports = { getDevs, newDev, updateDev }