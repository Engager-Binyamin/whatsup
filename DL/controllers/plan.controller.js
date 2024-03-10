const planModel = require('../models/plan.model');

async function read(filter = {}) {
    return await planModel.find(filter)
}


module.exports = {
    read
}
