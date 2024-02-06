const express = require('express');
const { Client, LocalAuth, MessageMedia, Whatsapp } = require('whatsapp-web.js');
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

isSending = false;

async function sendNewMessage(data) {
    const rtrnData = {
        phone: data.phone,
        name: data.name,
        _idL: data._id,
        msg: data.msg,
        _idM: data._idM,
        idC: data.idC,
        withName: data.withName,
        issend: "Message sent successfully"
    };
    const newData = data;
    const chatId = `972${Number(newData.phone)}@c.us`;

    const isWhatsApp = await client.isRegisteredUser(chatId);
    if (!isWhatsApp) {
        console.log("Not a WhatsApp user");
        rtrnData.issend = "Not a WhatsApp user";
        io.emit("send", { rtrnData });
        return;
    }

    try {
        delay(6000 + Math.random() * 1000)
        if (newData.withName) {
            client.sendMessage(chatId, `שלום ${newData.name}, ${newData.msg}`)
                .then(() => {
                    io.emit("send", { rtrnData })
                })
        }
        else {
            client.sendMessage(chatId, newData.msg)
                .then(() => {
                    io.emit("send", { rtrnData });
                })
                .catch(error => {
                    console.error("Error sending message:", error);
                    io.emit("send", { message: "Error sending message" });
                });
        }
    } catch (error) {
        console.error("Error sending message:", error);
        io.emit("send", { message: "Error sending message" });
    }
}


io.on('connection', async (socket1) => {
    socket1.on('data', (data) => {
        console.log(data);
        try {
            sendNewMessage(data);
        } catch (error) {
            console.error("Error sending message:", error.message);
            // אפשר לשלוח הודעת שגיאה חזרה ללקוח דרך הסוקט, לדוג':
            // socket1.emit('error', { message: 'Failed to send message' });
        }
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
