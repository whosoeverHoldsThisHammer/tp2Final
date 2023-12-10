const devs = require('../data/devs');

async function getDevs() {
    return devs.getDevs();
}
  
async function getDev(id) {
    return devs.getDev(id);
}
  
async function newDev(dev) {
    return devs.newDev(dev);
}
  
async function updateDev(id, dev) {
    return devs.updateDev(id, dev);
}
  
async function deleteDev(id) {
    return devs.deleteDev(id);
}

module.exports = {getDevs, getDev, newDev, updateDev, deleteDev}