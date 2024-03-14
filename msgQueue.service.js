const msgQueueController = require('./DL/controllers/msgQueue.controller')

const luli = {
    campaignId: '65eda5d5a53246c4f887ce33',
    userId: '65ed9c525b51ed6b4bd16107',
    contentMsg: 'luli luli luli',
    leadId: '65f1d47cd1041bf650cfaf4f',
    requestedTime: 1710420774627
}
async function createMsgToLead(msgToLead) {
    const { campaignId, contentMsg, leadId, userId } = msgToLead
    let requestedTime
    if (msgToLead.requestedTime) {
        requestedTime = msgToLead.requestedTime
    } else {
        requestedTime = new Date().getTime()
    }
    msgQueueController.create({
        userId,
        leadId,
        campaignId,
        contentMsg,
        requestedTime
    })
}

let queue = []

async function updateQueue(arrayOfMsgs){
    arrayOfMsgs.foreach(msgA=>{
        queue.foreach((msgQ, i)=>{
            if(i>0){
                if(queue[i-1].sendingTime -msgQ > 6){
                    if(msgA.requestedTime < msgQ.sendingTime){

                    }
                }
            }
        })
    })
}

async function createQueue() {
    let msgs = await msgQueueController.read({})
    console.log(msgs);
    msgs.map((msg, i)=>{
        // sending time
        if(i>0){

        }else{
            // msg.sendingTime = msg.requestedTime
        }
    })
    // let objQueue = {}
    // msgs.forEach(ms => {
    //     if (objQueue[ms.date]) objQueue[ms.date].push(ms)
    //     else objQueue[ms.date] = [ms]
    // })
    // let queue = Object.keys(objQueue).sort((a, b) => a.date - b.date)
    // queue.forEach((d, index) => {
    //     objQueue[d].forEach((ms, i) => {
    //         if (i > 0) {
    //             ms.date = objQueue[d][i - 1]['date'] += 6000
    //         }
    //         if (i == 0) {
    //             if(index > 0){
    //                 if(ms.date - objQueue[d][objQueue[d].length-1].date - 6000){
    //                     ms.date = objQueue[d][objQueue[d].length-1].date += 6000
    //                 }
    //             }
    //         }
    // console.log(ms.date);
    // })
    // })
    // return objQueue

}





const express = require("express");
const router = express.Router();
router.all('/', async (req, res) => {
    try {

        createQueue()

        res.send('🪻🪻🪻')
    } catch (error) {
        res.send(error)
    }
})
module.exports = router





















































var cron = require('node-cron');


function schedulelili() {
    cron.schedule('5 * * * *', () => {
        console.log('running a task every minute');
        //   return 'running a task every minute'
    });









}







async function queue(objQueue) {
    for (d in objQueue) {
        for (ms of d) {
            schedule(ms.date)
        }
    }

}
// const nuni = {
//       _id: new ObjectId('65f1a111b104127c1544c786'),
//       userId: new ObjectId('65ed9c525b51ed6b4bd16107'),
//       campaignId: new ObjectId('65eda5d5a53246c4f887ce33'),
//       contentMsg: 'luli luli luli',
//       date: '2024-03-13T12:50:25.590Z',
//       leads:[1, 2, ],
//       __v: 0
// }



// async function sendMsg(data){
//     data.leads.foreach(l=>{
//         new Promise(resolve => setTimeout(resolve, 5000));
//         console.log('👑👑👑');
//     })
// }




// const express = require("express");
// const router = express.Router();

// router.all('/', async (req, res) => {
//     try {
//         // console.log( await createMsgToSend(luli))
//         // let messagesQueue = await createQueue()
//         // queue(messagesQueue)
//         // sendMsg(nuni)
//         // console.log(await schedulelili())

//         cron.schedule('09 00 * * *', () => {
//             console.log('running a task every minute');})

//         res.send('🪻🪻🪻')
//     } catch (error) {
//         res.send(error)
//     }
// })
// module.exports = router