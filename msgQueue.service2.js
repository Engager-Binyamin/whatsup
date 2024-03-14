const msgQueueController = require('./DL/controllers/msgQueue.controller')

let msgSchedule = []
let queue = []

function checkTimeMsg(msg){
    let now = new Date().getTime()
    if (msg.timeToSend <= now) {
        if (queue.length > 0) {
            queue.push(msg)
        } else {
            queue.push(msg)
            sendQueue()
        }
    }
    else {
        if (msgSchedule.length > 0) {
            msgSchedule.push(msg)
        } else {
            msgSchedule.push(msg)
            schedule()
        }
    }
}

// אם השרת קרס
async function createNewQueue() {
    let msgs = await msgQueueController.read({})
    msgs.forEach(ms => checkTimeMsg(ms))
}
// מוסיף את ההודעות לDB מופעל עבור כל הודעה שנכנסת ל addMsgToQueue 
async function addMsgToDB(msg) {
    let { userId, leadId, campaignId, contentMsg } = msg
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
async function addMsgToQueue(arrMsg) {
    arrMsg.forEach(ms => {
        addMsgToDB(ms)
        checkTimeMsg(ms)
    })
}

// מנהל תזמון - כשמגיע התזמון - מכניס את ההודעה לתור
async function schedule() {
    msgSchedule = msgSchedule.sort((a, b) => a.timeToSend - b.timeToSend)
    if (msgSchedule.length > 0) {
        let now = new Date().getTime()
        let timeAwait = msgSchedule[0].timeToSend - now
        // אם במקרה הזמן כבר עבר - הוא יוסיף אותו ישר לתחילת התור.
        setTimeout(() => {
            if (queue.length > 0) {
                queue.unshift(msgSchedule[0])
            } else {
                queue.unshift(msgSchedule[0])
                sendQueue()
            }
            msgSchedule.shift()
        }
            , timeAwait)
    } else {
        console.log('🌹🌹🌹');
    }
}

function eliraz(data) {
    console.log('💐💐💐');
}
// שולח את התור 
async function sendQueue() {
    if (queue.length > 0 ) {
        eliraz(queue[0])
        // לא מחקתי מהDB כי לא ידעתי בוודאות שזה נשלח.
        setTimeout(() => {
            queue.shift()
            sendQueue()

        }
            , 6000)
    } else {
        console.log('🌹🌹🌹');
    }
}



// זה מה שאריה או מישהו מעביר לי כל פעם שהמשתמש שולח הודעה... שולחים את זה בפונקציה addMsgToQueue 
let luli = [
    {
        userId: '65ed9c525b51ed6b4bd16107',
        leadId: '65f1d47cd1041bf650cfaf4f',
        contentMsg: 'yeeeeeeeeeee',
        timeToSend: 1710420624627,
        campaignId: '65eda5d5a53246c4f887ce33'
    },
    {
        userId: '65ed9c525b51ed6b4bd16107',
        leadId: '65f1d47cd1041bf650cfaf4f',
        contentMsg: 'yeeeeeeeeeee',
        timeToSend: 1710420624627,
        campaignId: '65eda5d5a53246c4f887ce33'
    },
    {
        userId: '65ed9c525b51ed6b4bd16107',
        leadId: '65f1d47cd1041bf650cfaf4f',
        contentMsg: 'yeeeeeeeeeee',
        timeToSend: 1710420624627,
        campaignId: '65eda5d5a53246c4f887ce33'
    }
]


const express = require("express");
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        await createNewQueue()
        // console.log({ queue, msgSchedule });
        // addMsgToQueue(luli)
        // sendQueue()
        res.send('🪻🪻🪻')
    } catch (error) {
        res.send(error)
    }
})

module.exports = router