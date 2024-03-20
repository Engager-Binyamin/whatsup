const { Server } = require("socket.io");
const { socketRouter } = require("../functions/clientInitialize");
const userModel = require("../DL/models/user.model");
const { Client, LocalAuth } = require("whatsapp-web.js");
const { clients } = require("../clients");

function createWhatsAppClient(clientId) {
  clients[clientId] = {};

  client = new Client({
    puppeteer: {
      headless: true,
      args: ["--no-sandbox"],
    },
    authStrategy: new LocalAuth({ clientId }),
    webVersionCache: {
      type: "remote",
      remotePath:
        "https://raw.githubusercontent.com/wppconnect-team/wa-version/main/html/2.2405.4.html",
    },
  });

  client
    .initialize()
    .then()
    .catch((e) => {
      console.log(e);
    });
  clients[clientId].bot = client;
  return clients[clientId];
}

const createServer = async (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    id = socket.handshake.auth.userData
      ? socket.handshake.auth.userData._id
      : "";
    createWhatsAppClient(id);
    socketRouter(io, socket, clients, id);
  });

  socket.on("disconnected", (reason) => {
    console.log(`Session disconnected for reason ${reason}`);
  });

  server.listen(3000, () => {
    console.log("listening on *:3000");
  });
};

module.exports = { createServer };
