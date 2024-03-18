const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');


const socketRouter = (io, socket,clients,clientId) => {
  
  let client = clients[clientId];

  // client.on('qr', (qr) => {
  //   if(clientId){
  //     console.log(`QR code received for ${clientId}`);
  //     qrcode.generate(qr, { small: true });
  //     socket.emit(`qr`, qr);
  //   }
  //   });
    
  //   client.on('ready', () => {
  //     console.log(`Client ${clientId} is ready!`);
  //     clients[clientId].isReady = true;
  //   socket.emit(`ready`);
  //   });
  
  
  if (client.isReady) {
    client.bot.on('disconnected', (reason) => {
      console.log(`Session disconnected for reason ${reason}`);
    });
  }
  

}
  //   

module.exports = {  socketRouter }