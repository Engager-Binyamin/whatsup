let campaignController = require('./DL/controllers/campaign.controller')

async function finishSendAddSave() {
    let data = {
        leadId: '',
        msgId: '',
        status: '',
        // enum: ["created", "sent", "received"],
        sentData: ''
    }
    campaignController.updateOne()
}
async function updateReceivedMsg() {
    campaignController.updateOne()
}

// התייחסות למצב שלא נשלח.
// עדכון הקליינט במצב ההודעות.



module.exports = { finishSendAddSave, updateReceivedMsg }