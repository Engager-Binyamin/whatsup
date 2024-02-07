const express = require('express');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs').promises
const { Server } = require('socket.io');
const cors = require('cors');
const port = 3636

const app = express();
const server = require('http').Server(app);
// const io = new Server(server);

// app.use(cors());

const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});




app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const client = new Client({
    authStrategy: new LocalAuth(),
});


let currentQRCode = "";


const { exec } = require('child_process');


const deleteFolderRecursive = async (folderPath) => {
    try {
        const files = await fs.readdir(folderPath);

        for (const file of files) {
            const filePath = `${folderPath}/${file}`;
            const fileStats = await fs.stat(filePath);

            if (fileStats.isDirectory()) {
                // אם הפריט הוא תיקייה, קרא לעצמך רקורסיבית כדי למחוק את התיקייה
                await deleteFolderRecursive(filePath);
            } else {
                // אם הפריט הוא קובץ, סגור אותו ואז מחק
                const fileHandle = await fs.open(filePath, 'r+');
                await fileHandle.close();
                await fs.unlink(filePath);
            }
        }

        // לאחר שכל הפריטים נמחקו, מחק את התיקייה עצמה
        await fs.rmdir(folderPath);
    } catch (error) {
        console.error('Error deleting folder and files:', error);
    }
};

client.on('disconnected', async () => {

    const folder = "./.wwebjs_auth"

  await deleteFolderRecursive(folder).then(
  client.initialize())

});

client.on('ready', () => {
    console.log('Client is ready!');
    io.emit('ready'); // שלח הודעה לצד הלקוח כאשר הלקוח מוכן
});

const getQr = () => {
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
        io.emit('qr', qr); // שלח את ה-QR code גם לצד הלקוח
    });
}

getQr()

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
        _idL: data._idL,
        _idM: data._idM,
        idC: data.idC,
        issend: "Message sent successfully"
    };
    const newData = data;
    const chatId = `972${Number(newData.phone)}@c.us`;

    const isWhatsApp = await client.isRegisteredUser(chatId);
    if (!isWhatsApp) {
        rtrnData.issend = "Not a WhatsApp user";
        io.emit("send", { rtrnData });
        return;
    }

    try {
        if (newData.withName) {
            client.sendMessage(chatId, `שלום ${newData.name}, ${newData.msg}`)
                .then(() => {
                    io.emit("send", { rtrnData })
                }).then(()=>{
                    delay(6000 + Math.random() * 1000)
                })
        }
        else {
            client.sendMessage(chatId, newData.msg)
                .then(() => {
                    io.emit("send", { rtrnData });
                }).then(()=>{
                    delay(6000 + Math.random() * 1000)
                })
                .catch(error => {
                    console.error("Error sending message:", error);
                    io.emit("send", { message: "Error sending message" });
                })
        }
    } catch (error) {
        console.error("Error sending message:", error);
        io.emit("send", { message: "Error sending message" });
    }
}

async function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t))
}
io.on('connection', async (socket1) => {
    socket1.on('data', (data) => {
        console.log(data);
        try {
            sendNewMessage(data);
        } catch (error) {
            console.error("Error sending message:", error.message);
        
        }
    });
});




server.listen(3000, () => {
    console.log('Server is running on port 3000');
})

app.listen(port, () => { console.log("Listening on port " + port) })
