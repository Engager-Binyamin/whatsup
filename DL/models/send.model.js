// const mongoose = require("mongoose");

// const sendSchema = new mongoose.Schema({
//     userId:{
//         type: mongoose.Types.ObjectId,
//         required: true
//     },
//     campaignId:{
//         type: mongoose.Types.ObjectId,
//         required: true
//     },
//     msgId:{
//         type: mongoose.Types.ObjectId,
//         required: true
//     },
//     date:{
//         type: Date
//     },
//     status:{
//         type: String,
//         enum: ['isActive', 'isAwait', 'isTiming', 'isFinish']
//     }  
// });
// const sendModel = mongoose.model("send", sendSchema);
// module.exports = sendModel;