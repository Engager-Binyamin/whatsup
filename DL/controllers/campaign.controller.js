const campaignModel = require('../models/campaign.model');

// 
async function read(filter, select = "") {
    return await campaignModel.find(filter).select(select)
}

//
async function readOne(filter = {}) {
    return await campaignModel.findOne(filter)
}

//not in use
async function readOneWithoutPopulate(filter, populate) {
    return await campaignModel.findOne(filter).populate(populate)
}

async function updateOne(filter = {}, update) {
    return await campaignModel.updateOne(filter, update, { new: true })
}



module.exports = {
    read,
    readOne,
    updateOne,
    readOneWithoutPopulate
}
