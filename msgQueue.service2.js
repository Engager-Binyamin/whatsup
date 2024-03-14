const msgQueueController = require('./DL/controllers/msgQueue.controller')

let msgSchedule = []
let queue = []
// אם השרת קרס
async function createNewQueue(){
    let msgs = await msgQueueController.read({})
    msgs.forEach(ms=>{
        let now = new Date().getTime()
        if(ms.timeToSend <= now) queue.push(ms)
        else msgSchedule.push(ms)
    })
    console.log({queue, msgSchedule});
}
async function addMsgToDB(msg){
    let {userId, leadId, campaignId, contentMsg} = msg
    let timeToSend
    if (msg.timeToSend) {
        timeToSend = msg.timeToSend
    } else {
        timeToSend = new Date().getTime()
    }
    msgQueueController.create({
        userId,
        leadId,
        campaignId,
        contentMsg,
        timeToSend
    })
}
// הוספת הודעות
async function addMsgToQueue(arrMsg){
    arrMsg.forEach(ms=>{
        addMsgToDB(ms)
        let now = new Date().getTime()
        if(ms.timeToSend <= now) queue.push(ms)
        else msgSchedule.push(ms)
    })
}
async function schedule(){}
function eliraz(){
    console.log('💐💐💐');
}
// שולח. אמור לבדוק בכל רגע נתון אם יש הודעות בתור. או שההוספה לתור יבדוק אם הוא עובד.
async function sendQueue(arrQueue){
    if(!arrQueue.length == 0){
        eliraz(arrQueue[0])
        setTimeout(()=>{
            arrQueue.shift()
            // לא מחקתי מהDB כי לא ידעתי בוודאות שזה נשלח.
            sendQueue(arrQueue)
        }
        , 6000)
    }else{
        console.log('🌹🌹🌹');
        // return '🌹🌹🌹'
    }
}




let luli = [
    {
        userId:'65ed9c525b51ed6b4bd16107',
        leadId:'65f1d47cd1041bf650cfaf4f',
        contentMsg:'yeeeeeeeeeee',
        timeToSend : 1710420624627,
        campaignId:'65eda5d5a53246c4f887ce33'
    },
    {
        userId:'65ed9c525b51ed6b4bd16107',
        leadId:'65f1d47cd1041bf650cfaf4f',
        contentMsg:'yeeeeeeeeeee',
        timeToSend : 1710420624627,
        campaignId:'65eda5d5a53246c4f887ce33'
    },
    {
        userId:'65ed9c525b51ed6b4bd16107',
        leadId:'65f1d47cd1041bf650cfaf4f',
        contentMsg:'yeeeeeeeeeee',
        timeToSend : 1710420624627,
        campaignId:'65eda5d5a53246c4f887ce33'
    }
]


const express = require("express");
const router = express.Router();
router.all('/', async (req, res) => {
    try {
        // addMsgToQueue(luli)
        await createNewQueue()
        sendQueue(queue)
        res.send('🪻🪻🪻')
    } catch (error) {
        res.send(error)
    }
})
module.exports = router