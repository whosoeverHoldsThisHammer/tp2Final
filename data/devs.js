const connection = require("./conn");
const objectId = require("mongodb").ObjectId;

async function getDevs() {
  const connectiondb = await connection.getConnection();
  const devs = await connectiondb
    .db("tp2_final")
    .collection("desarrolladores")
    .find()
    .toArray();

  return devs;
}

async function getDev(id) {
  const connectiondb = await connection.getConnection();
  const dev = await connectiondb
    .db("tp2_final")
    .collection("desarrolladores")
    .findOne({ _id: new objectId(id) });

  return dev;
}

async function newDev(dev) {
  const connectiondb = await connection.getConnection();
  const result = await connectiondb
    .db("tp2_final")
    .collection("desarrolladores")
    .insertOne(dev);

  return result;
}

async function updateDev(id, dev){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('desarrolladores')
        .updateOne(
            {_id: new objectId(id)},
            { $set: {
                nombre: dev.nombre
                }
            }
        )

    return result;
}

async function deleteDev(id){
    const connectiondb = await connection.getConnection();
    const result = await connectiondb
        .db('tp2_final')
        .collection('desarrolladores')
        .deleteOne({_id: new objectId(id)})

    return result
}

module.exports = { getDevs, getDev, newDev, updateDev, deleteDev }

