const { Server } = require('socket.io');
const { socketRouter } = require('./clientInitialize');
const userModel = require('./DL/models/user.model');
const { Client, LocalAuth } = require('whatsapp-web.js');


const clients = {};
let client
let id
 function createWhatsAppClient(clientId) {
    clients[clientId] = {}
  
     client = new Client({
         puppeteer: {
             headless: true,
             args: [
                 '--no-sandbox',
             ],
         },
         authStrategy: new LocalAuth({ clientId }),
         webVersionCache: {
             type: 'remote',
             remotePath: 'https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2405.4.html'
         }
     });
  
    client.initialize().then().catch((e) => {
      console.log(e)
    });
    clients[clientId].bot = client;
    return clients[clientId];
  }
async function getUsers() {
    try {
        users = await userModel.find({});
        console.log(users[0]._id);
        createWhatsAppClient(users[0]._id);
        id = users[0]._id

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}
const createServer = async (server) => {
    const io = new Server(server,{
        cors: {
            origin: 'http://localhost:5173',
            methods: ['GET', 'POST'],
            credentials: true,
        },
    });
    await getUsers();

    io.on('connection', (socket) => {
        socketRouter(io, socket, client, clients,id);
    })

    server.listen(3000, () => {
        console.log('listening on *:3000');;
    })
}

module.exports = { createServer };