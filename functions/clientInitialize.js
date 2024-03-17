const qrcode = require("qrcode-terminal");
const { Client, LocalAuth } = require("whatsapp-web.js");

let client;

const socketRouter = (io, socket, client, clients, clientId) => {
  client.on("qr", (qr) => {
    if (clientId) {
      console.log(`QR code received for ${clientId}`);
      qrcode.generate(qr, { small: true });
      socket.emit(`qr`, qr);
    }
  });

  client.on("ready", () => {
    console.log(`Client ${clientId} is ready!`);
    clients[clientId].isReady = true;
    socket.emit(`ready`);
  });

  client.on("auth_failure", (session) => {
    console.log(`Session ${session} authentication failure!`);
  });

  client.on("authenticated", (session) => {
    console.log(`Session ${session} authenticated`);
  });

  client.on("change_state", (state) => {
    console.log(`Session ${session} changed state to ${state}`);
  });

  client.on("disconnected", (reason) => {
    console.log(`Session disconnected for reason ${reason}`);
  });

  client.on("loading_screen", (msg, parent) => {
    console.log(msg, parent);
  });
};
//

module.exports = { socketRouter };
