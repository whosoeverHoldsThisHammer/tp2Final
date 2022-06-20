const connection = require("./conn");
const objectId = require("mongodb").ObjectId;

async function getDevs() {
  const clientMongo = await connection.getConnection();
  const devs = await clientMongo
    .db("tp2_final")
    .collection("desarrolladores")
    .find()
    .toArray();

  return devs;
}

async function getDev(id) {
  const clientMongo = await connection.getConnection();
  const dev = await clientMongo
    .db("tp2_final")
    .collection("desarrolladores")
    .findOne({ _id: new objectId(id) });

  return dev;
}

async function newDev(dev) {
  const clientMongo = await connection.getConnection();
  const result = await clientMongo
    .db("tp2_final")
    .collection("desarrolladores")
    .insertOne(dev);

  return result;
}

async function updateDev(dev) {
  console.log(dev);
  const clientMongo = await connection.getConnection();
  const result = await clientMongo
    .db("tp2_final")
    .collection("desarrolladores")
    .updateOne(
      { _id: new objectId(dev._id) },
      {
        $set: {
          nombre: dev.nombre,
          proyecto_id: dev.proyecto_id,
        },
      }
    );

  return result;
}

module.exports = { getDevs, getDev, newDev, updateDev };
