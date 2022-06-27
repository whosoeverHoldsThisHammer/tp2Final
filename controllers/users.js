const users = require('../data/users');

async function getAllUsers() {
    return users.getAllUsers();
  }
  
  async function addUser(user) {
    return users.addUser(user);
  }
  
  async function findByCredential(email, password) {
    return users.findByCredential(email, password);
  }
  
  function generateToken(user) {
    return users.generateToken(user);
  }
  module.exports = { getAllUsers, addUser, findByCredential, generateToken };