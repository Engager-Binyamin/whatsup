const userModel = require('../models/user.model');

async function create(data) {
    return await userModel.create(data);
}

async function read(filter={}) {
    return await userModel.find(filter);
}

async function readOne(filter) {
    return await userModel.findOne(filter)
}

async function update(filter, data) {
    return await userModel.updateOne(filter, data, {new: true})
}

async function updateOne(filter, data) {
    return await userModel.updateOne(filter, data, { new: true })
}

module.exports = { create, read, readOne, update, updateOne }