const msgQueueController = require('./DL/controllers/msgQueue.controller')
const campaignController = require('./DL/controllers/campaign.controller')

let msgSchedule = {}
let queue = {}

function checkTimeMsg(msg, userId) {
    try {
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
                msgSchedule[userId]?.push(msg)
                schedule(userId)
            }
        }
    } catch (error) {
        console.log(error);
    }
}

// אם השרת קרס
async function createNewQueue(_id = '65ed9c525b51ed6b4bd16107',newMsgs=undefined) {
    try {
        let msgs 
        if (!queue[_id]) queue[_id] = []
        if (!msgSchedule[_id]) msgSchedule[_id] = []
        if(!newMsgs)
        msgs = await msgQueueController.read({ userId:_id })
        else 
            msgs = newMsgs
        msgs.forEach(ms => { 
            checkTimeMsg(ms, _id)})
    } catch (error) {
        console.log(error);
    }
}

// מוסיף את ההודעות לDB מופעל עבור כל הודעה שנכנסת ל addMsgToQueue 
async function addMsgToDB(msg) {
    try {
        let { userId, leadId, campaignId, contentMsg, msgId } = msg
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
            timeToSend,
            msgId
        })
    } catch (error) {
        console.log(error);
    }
}

// הוספת הודעות
async function addMsgToQueue(arrMsg, userId) {
    try {
        let newMsgs = await Promise.all(arrMsg.map(async (ms) => {
        let msg = await addMsgToDB(ms)
        return msg
    }))
    await createNewQueue(userId,newMsgs)
    } catch (error) {
        console.log(error);
    }
}

// מנהל תזמון - כשמגיע התזמון - מכניס את ההודעה לתור
async function schedule(userId) {
    try {
        msgScheduleByUser = msgSchedule[userId]?.sort((a, b) => a.timeToSend - b.timeToSend)
        if (msgSchedule[userId]?.length > 0) {
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
        }
    } catch (error) {
        console.log(error);
    }
}

async function sentOneMsg(data) {
    try{
        const campaign = await campaignController.readOne({_id:data.campaignId})
        if(!campaign) throw 'ajs'
        const lead = campaign.leads.find(le=>String(le._id)===String(data.leadId))
        if(!lead) throw 'asfd'
        const received = campaign.receivedMsgs.find(re=>(String(re.msgId)===String(data.msgId) && String(re.leadId)===String(data.leadId)))
        if(!received) throw 'asfd'
        const newData= {
            leadId:data.leadId,
            msg:data.contentMsg,
            userID: data.userId,
            phone: lead.phone.replace('0','',1),
            receivedId: received._id
        }
        sendNewMessage(newData)
    }catch(err){
        console.log(err);
    }
}
// עדכון בDB מרכזי
async function createReceideMsg(userId){
    let msg = queue[userId][0]
    let data = {
        leadId: msg.leadId,
        msgId: msg.msgId
    }
    return await campaignController.updateOne({_id: msg.campaignId}, {$push:{receivedMsgs:data}})
}

// שולח את התור 
async function sendQueue(userId) {
    try {
        if (queue[userId]?.length > 0) {
            await createReceideMsg(userId)
            sentOneMsg(queue[userId][0])
            setTimeout(async () => {
                await msgQueueController.del(queue[userId][0]._id)
                queue[userId].shift()
                sendQueue(userId)
            }
                , 6000)
        } else {
            return
            // console.log('🌹🌹🌹');
        }
    } catch (error) {
        console.log(error);
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
const { sendNewMessage } = require('./BL/sendmessage.service')
const { readOne, readOneWithoutPopulate } = require('./DL/controllers/campaign.controller')
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


module.exports = {createNewQueue,addMsgToQueue}