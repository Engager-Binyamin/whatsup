// let data = {
//     // user
//     '65ed9c525b51ed6b4bd16107':
//     {
//         // campaign                      data of msg
//         '65e8383aa21e57283fd91e90': [{ msg: 'yyy', date: 'h' }],
//         '65e83b7d694453406bb3e7de': [{ msg: 'iiii', date: 'h' }]
//     }
// }

// const express = require("express");
// const router = express.Router();
// const sendController = require('./DL/controllers/send.controller')

// router.get('/', async (req, res) => {
//     console.log('👏👏👏');
//     let sends = sendController.read()
//     try {
//         res.send(sends)
//     } catch (error) {
//         res.send(error)
//     }
// })


// router.post('/', async (req, res) => {
//     try {
//         let newSend = sendController.create(req.body)
//         // console.log(req.body)
//         res.send(newSend)
//     } catch (error) {
//         res.send(error)
//     }
// })

// module.exports = router


// קוראים לה כשיש שליחה בקליינט, או שפונקציית תזמון קוראת לה.
async function sendMsg (msgs){
    if (msgs[0]){
        await kobi(msgs[0])
        msgs.shift()
        if (msgs[0]){
            sendMsg(msgs)
        }
    }
}

function timing() {

}

// console.log(sendMsg(userId = '65ed9c525b51ed6b4bd16107', campaignId = '65e8383aa21e57283fd91e90', msg = 'fff', date = 'h'));