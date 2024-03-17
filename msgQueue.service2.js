const msgQueueController = require('./DL/controllers/msgQueue.controller')

let msgSchedule = {}
let queue = {}

function checkTimeMsg(msg, userId) {
    let now = new Date().getTime()
    if (msg.timeToSend <= now) {
        if (queue[userId]?.length > 0) {
            queue[userId]?.push(msg)
        } else {
            queue[userId]?.push(msg)
            sendQueue(userId)
        }
    }
    else {
        if (msgSchedule[userId]?.length > 0) {
            msgSchedule[userId]?.push(msg)
        } else {
            console.log('🤡');
            msgSchedule[userId]?.push(msg)
            schedule(userId)
        }
    }
    // console.log({ queue, msgSchedule, luli: queue['65ed9c525b51ed6b4bd16107'] });
}

// אם השרת קרס
async function createNewQueue(_id = '65ed9c525b51ed6b4bd16107',newMsgs) {
    let msgs 
    if (!queue[_id]) queue[_id] = []
    if (!msgSchedule[_id]) msgSchedule[_id] = []
    if(!newMsgs)
    msgs = await msgQueueController.read({ userId:_id })
    else 
        msgs = newMsgs
    msgs.forEach(ms => { 
        checkTimeMsg(ms, _id)})
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
    return msgQueueController.create({
        userId,
        leadId,
        campaignId,
        contentMsg,
        timeToSend
    })
}

// הוספת הודעות
async function addMsgToQueue(arrMsg, userId) {
    let newMsgs = await Promise.all(arrMsg.map(async (ms) => {
        let msg = await addMsgToDB(ms)
        return msg
    }))
    await createNewQueue(userId,newMsgs)
}

// מנהל תזמון - כשמגיע התזמון - מכניס את ההודעה לתור
async function schedule(userId) {
    console.log({userId, msgSchedule});
    console.log('🪻🪻');
    console.log(msgSchedule[userId]);
    msgScheduleByUser = msgSchedule[userId]?.sort((a, b) => a.timeToSend - b.timeToSend)
    console.log({msgScheduleByUser});
    if (msgSchedule[userId]?.length > 0) {

        console.log(msgSchedule[userId][0].timeToSend)

        let now = new Date().getTime()
        let timeAwait = msgSchedule[userId][0].timeToSend - now
        // אם במקרה הזמן כבר עבר - הוא יוסיף אותו ישר לתחילת התור.
        setTimeout(() => {
            if (queue[userId]?.length > 0) {
                queue[userId]?.unshift(msgSchedule[0])
            } else {
                queue[userId]?.unshift(msgSchedule[0])
                sendQueue(userId)
            }
            msgSchedule[userId]?.shift()
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
async function sendQueue(userId) {
    if (queue[userId]?.length > 0) {
        eliraz(queue[userId][0])
        setTimeout(() => {
            // msgQueueController.del(queue[userId][0]._id)
            queue[userId].shift()
            sendQueue(userId)

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
        contentMsg: 'yooooooooooooooooooo',
        timeToSend: 1710420624627,
        campaignId: '65eda5d5a53246c4f887ce33'
    },
    {
        userId: '65ed9c525b51ed6b4bd16107',
        leadId: '65f1d47cd1041bf650cfaf4f',
        contentMsg: 'yllllllllllllllleee',
        timeToSend: 1710420624627,
        campaignId: '65eda5d5a53246c4f887ce33'
    }
]


const express = require("express");
const { use } = require('./msgQueue.service2')
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // addMsgToQueue(luli)
        await createNewQueue()
        res.send('🪻🪻🪻')
    } catch (error) {
        res.send(error)
    }
})

module.exports = router