const connection = require("./conn");
const objectId = require("mongodb").ObjectId;

async function getAllManagers() {
    const clientMongo = await connection.getConnection();
    const managers = await clientMongo
      .db("tp2_final")
      .collection("managers")
      .find()
      .toArray();
  
    return managers;
}

async function getManager(id) {
    const clientMongo = await connection.getConnection();
    const manager = await clientMongo
      .db("tp2_final")
      .collection("managers")
      .findOne({_id: new objectId(id)});
  
    return manager;
}

async function newManager(manager) {
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
      .db("tp2_final")
      .collection("managers")
      .insertOne(manager);
  
    return result;
}

async function updateManager(manager, id){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('managers')
        .updateOne(
            {_id: new objectId(id)},
            { $set: { nombre: manager.nombre } }
        )
    return result;
}

async function deleteManager(id){
    const clientMongo = await connection.getConnection();
    const result = await clientMongo
        .db('tp2_final')
        .collection('managers')
        .deleteOne({_id: new objectId(id)})

    return result;
}

module.exports = {getAllManagers, getManager, newManager, updateManager, deleteManager};