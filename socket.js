const { Server } = require('socket.io');
const { socketRouter } = require('./clientInitialize');
const userModel = require('./DL/models/user.model');
const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');



const clients = {"65ed9c525b51ed6b4bd16107":{},"123456789":{}, "65eeca187d0944e92ab44179":{}};
let client
let id
function createWhatsAppClient(clientId,io, socket) {
    clients[clientId] = {}
  
     client = new Client({
         puppeteer: {
             headless: true,
             args: [
                 '--no-sandbox',
             ],
         },
         authStrategy: new LocalAuth({ clientId })
        //  webVersionCache: {
        //      type: 'remote',
        //      remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2405.4.html'
        //  }
     });
     client.on('qr', (qr) => {
        if(clientId){
          console.log(`QR code received for ${clientId}`);
          qrcode.generate(qr, { small: true });
          socket.emit(`qr`, qr);
        }
        });
        
        client.on('ready', () => {
          console.log(`Client ${clientId} is ready!`);
          clients[clientId].isReady = true;
        socket.emit(`ready`);
        });
      
  
    client.initialize().then().catch((e) => {
      console.log(e)
    });
    clients[clientId].bot = client;
    return clients[clientId];
  }



const createServer = async (server) => {
    const io = new Server(server,{
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });

    io.on('connection', (socket) => {
        id = socket.handshake.auth.userData ? socket.handshake.auth.userData._id:''
        createWhatsAppClient(id, io, socket);
        // socketRouter(io, socket, client, clients,id);
    })

    server.listen(3000, () => {
        console.log('listening on *:3000');;
    })
}

module.exports = { createServer, clients };