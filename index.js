const express = require('express');
const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs').promises
const { Server } = require('socket.io');
const cors = require('cors');
const port = 3636
const puppeteer = require('puppeteer');


const app = express();
const server = require('http').Server(app);


const io = require('socket.io')(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true,
    },
});


app.use(express.json())


app.use(cors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}));

const client = new Client({
    authStrategy: new LocalAuth(),
},
{
    puppeteer: {
        executablePath: '/path/to/Chrome',
    }
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

let clientReady = false


client.on('ready', () => {
    console.log('Client is ready!');
    clientReady = true
    io.emit('ready'); // שלח הודעה לצד הלקוח כאשר הלקוח מוכן
    // sendNewMessage(sampleData); //שליחת הודעת ניסיון ישירות דרך שרת ווצאפ

});

// כאשר יש חיבור מלקוח
io.on('connection', (socket5) => {
    // כאשר הלקוח שואל שאלה
    socket5.on("askServer", (clientReady) => {
        console.log('Client is asking a question');

        // טפל בשאלה מהלקוח ושלח תשובה או בצורת המידע המתאימה
        socket5.emit('serverResponse', { message: 'Hello from the server!', clientReady });
    });
});



const getQr = () => {
    client.on('qr', (qr) => {
        qrcode.generate(qr, { small: true });
        io.emit('qr', qr); // שלח את ה-QR code גם לצד הלקוח
    });
}

getQr()


client.initialize();

isSending = false;

async function sendNewMessage(data) {
    const rtrnData = {
        leadId: data._idL,
        msgId: data._idM,
        campId: data.idC,
        issend: "recieved"
    };

    const newData = data;
    const chatId = `972${Number(newData.phone)}@c.us`;

    try {
        let media;
        if (data.file) {
         media =  await MessageMedia.fromUrl(data.file)
        }

        if (newData.withName) {
            await client.sendMessage(chatId, `שלום ${newData.name}, ${newData.msg}`);
        } else {
            await client.sendMessage(chatId, newData.msg);
        }

        if (media) {
            await client.sendMessage(chatId, media);
        }

        io.emit("sent", { rtrnData });
    } catch (error) {
        console.error("Error sending message:", error);
        io.emit("sent", { message: "Error sending message" });
    }
}




const sampleData = {
    _idL: "123",
    _idM: "456",
    idC: "789",
    phone: "0503210090", // Replace with the actual phone number
    withName: true,
    name: "elirazoooosh",
    msg: "Hello, how are you?",
    file: "https://www.gov.il/BlobFolder/homepage/new-home-page/he/428_487.jpg " // Replace with the actual file path if needed
};

// Call the function
async function delay(t) {
    return new Promise(resolve => setTimeout(resolve, t))
}
io.on('connection', async (socket1) => {
    socket1.on('data', (data) => {
        try {
            sendNewMessage(data);

        } catch (error) {
            console.error("Error sending message:", error.message);
        
        }
    });
});



// const miriamTest = require('./schedules')
// app.use('/miriamTest', miriamTest)



// server.listen(3000, () => {
//     console.log('Server is running on port 3000');
// })

app.listen(port, () => { console.log("Listening on port " + port) })
