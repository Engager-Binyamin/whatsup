const express = require('express');
const { Client, LocalAuth, MessageMedia , Whatsapp} = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { ChatTypes, MessageAck } = require('whatsapp-web.js/src/util/Constants');
const puppeteer = require('puppeteer');
const app = express()
const port = 3636
const { createServer } = require('node:http');
const server = createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const client = new Client({
    puppeteer: {
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
    authStrategy: new LocalAuth(),
});

io.on('connection', (socket) => {
    socket.emit("qr", currentQRCode);

    socket.on("howdy", (data) => {
        console.log(data)
    })
})

let currentQRCode = "";  // יש להוסיף משתנה שיחזיק את ה-QR code הנוכחי

client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR RECEIVED', qr);
    currentQRCode = qr;  // שמירת ה-QR code הנוכחי
    // אפשר כמובן להפעיל פונקציה אחרת כאן שמתייחסת ל-QR code
});

async function qrSend() {
    const currentQRCode = qr;  // החזרת ה-QR code הנוכחי
    io.emit('qr', currentQRCode)
}

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', msg => {
    if (msg.body == 'ping') {
        msg.reply('pong');
    }
});

client.on('message', msg => {
    if (msg.body == 'מה') {
        msg.reply('מותה');
    }
});

client.initialize();

async function sendNewMessage(data) {

    const newData = data;
    const chatId = `972${Number(newData.phone)}@c.us`;

    try {
        // client.on('message', async () => {
        client.sendMessage(chatId, newData.msg)
            .then(
                console.log("Message sent successfully"))
    } catch (error) {
        console.error("Error sending me ssage:", error);
        throw error;
    }
}

io.on('connection', async (socket1) => {
    socket1.on('data', (data) => {
        // data מכיל את הנתונים שנשלחו מהשרת
        delay(6000 + Math.random() * 10000).then(() => {
            sendNewMessage(data);
        })
    });

});

async function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t))
}


app.use('/qrcode', express.static('qrcode'))

app.get('/', async (req, res) => {
    try {
        qrSend()
        res.send('Hello World!')
    } catch (error) {
        res.send(error)
    }
})

server.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.listen(port, () => { console.log("Listening on port " + port) })
