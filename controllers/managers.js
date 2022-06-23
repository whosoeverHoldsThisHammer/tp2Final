const managers = require('../data/managers');

async function getAllManagers() {
    return managers.getAllManagers();
}

async function getManager(id) {
    return managers.getManager(id);
}

async function newManager(manager) {
    return managers.newManager(manager);
}

async function updateManager(manager, id) {
    return managers.updateManager(manager, id);
}

async function deleteManager(id) {
    return managers.deleteManager(id);
}


module.exports = {getAllManagers, getManager, newManager, updateManager, deleteManager};