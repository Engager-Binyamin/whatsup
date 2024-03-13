const mongoose = require("mongoose");

const planSchema = new mongoose.Schema({
 
});
const planModel = mongoose.model("plan", planSchema);
module.exports = planModel;
