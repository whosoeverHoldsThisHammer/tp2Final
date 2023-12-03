require("dotenv").config();
const connection = require("./conn");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsers() {
  const connectiondb = await connection.getConnection();
  const users = await connectiondb
    .db("tp2_final")
    .collection("users")
    .find()
    .toArray();
  return users;
}

async function addUser(user) {
  console.log(user)
  const connectiondb = await connection.getConnection();
  user.password = await bcrypt.hash(user.password, 8);
  const usuario = await connectiondb
    .db("tp2_final")
    .collection("users")
    .insertOne(user);
  return usuario;
}

async function findByCredential(email, password) {
  const connectiondb = await connection.getConnection();
  const user = await connectiondb
    .db("tp2_final")
    .collection("users")
    .findOne({ email: email });

  if (!user) {
    throw new Error("Credenciales no validas");
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Credenciales no validas");
  }

  return user;
}

function generateToken(user) {
  const token = jwt.sign({ _id: user._id }, process.env.CLAVESECRETA, {
    expiresIn: "2h",
  });
  return token;
}
module.exports = { getAllUsers, addUser, findByCredential, generateToken };
