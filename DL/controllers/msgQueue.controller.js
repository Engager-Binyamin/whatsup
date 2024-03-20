const msgQueueModel = require('../models/msgQueue.model')
const db = require("../db");
db.connect();


async function create(data){
    return await msgQueueModel.create(data)
}

async function read(filter){
    return await msgQueueModel.find(filter)
}

async function update(id, data){
    return await msgQueueModel.updateOne({_id: id}, data)
}

async function del(id){
    return await msgQueueModel.deleteOne({_id: id})
}

// [
//     {
//       userId: "65ed9c525b51ed6b4bd16107",
//       leadId: "65f8adf050de1521551339bd",
//       contentMsg: "yeeeeeeeeeee",
//       timeToSend: 1710420624627,
//       campaignId: "65f8adf050de1521551339b9",
//       msgId:'65f8adf050de1521551339ba'
//     },
//     {
//       userId: "65ed9c525b51ed6b4bd16107",
//       leadId: "65f8adf050de1521551339bd",
//       contentMsg: "yooooooooooooooooooo",
//       timeToSend: 1710420624627,
//       campaignId: "65f8adf050de1521551339b9",
//       msgId:'65f8adf050de1521551339ba'
//     },
//     {
//       userId: "65ed9c525b51ed6b4bd16107",
//       leadId: "65f8adf050de1521551339bd",
//       contentMsg: "yllllllllllllllleee",
//       timeToSend: 1710420624627,
//       campaignId: "65f8adf050de1521551339b9",
//       msgId:'65f8adf050de1521551339ba'
//     },
//   ].forEach((v)=>create(v))

module.exports = {create, read, update, del}