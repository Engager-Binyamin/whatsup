const {clients} = require('../clients.js')
const campaignController = require('../DL/controllers/campaign.controller.js')

let isSending = false;

async function sendNewMessage(data ) {
  let client = clients[data.userID];
  // const rtrnData = {
  //   _idL: data._idL,
  //   _idM: data._idM,
  //   idC: data.idC,
  //   issend: "Message sent successfully"
  // };
  const newData = data;
  const chatId = `972${Number(newData.phone)}@c.us`;
  if (client.isReady) {
  try {
    let messageId;
    let sentMessage;
    // Define the event listener functions
    const sendListener =async (msg) => {
      if (msg.id.fromMe && msg.to === chatId) {
        messageId = msg.id.id;
        sentMessage = msg;
        console.log(`Message with ID ${messageId} was sent to ${chatId}`);
      }
    };
    const ackListener = async(msg, ack) => {

      const campaign = await campaignController.readOne({_id: newData.campaignId})
      if (!campaign) throw 'error'
      let received = campaign.receivedMsgs.find(re=> String(re._id) == String(newData.receivedId))
      if (!received) throw 'error'

      
      if (msg.id.id === messageId) {
        if (ack === 1) {
          console.log(`Message with ID ${messageId} was sent`)
          received.status = 'sent'
          received.sentData = Date.now()
          campaign.save()
        }else if (ack === 2) {
          console.log(`Message with ID ${messageId} was received by ${chatId}`);
          received.status = 'received'
          campaign.save()
          isSending = false; // Set isSending to false when the message is received
        } else if (ack === 3) {
          console.log(`Message with ID ${messageId} was read by ${chatId}`);
          // received.status = 'read'
          // campaign.save()
        } else{
            console.log("something ins't right")
        }
      }
    };
    isSending = true; // Set isSending to true before sending the message
    // Add the event listeners
    client.bot.on('message_send', sendListener)
    client.bot.on('message_send', async ()=> {
        console.log(sendListener)
    });
    client.bot.on('message_ack', ackListener)
    client.bot.on('message_ack', async (msg, ack) => {
       console.log ('MESSAGE SENT',
       'from:', msg.from,
       'to:', msg.to,
       'id:', msg.id.id,
       'ack:', msg.ack);
    })
    let media;
    if (newData.file) {
      media = await MessageMedia.fromUrl(newData.file);
    }
      sentMessage = await client.bot.sendMessage(chatId, newData.msg);
    if (media) {
      await client.bot.sendMessage(chatId, media);
    }
    // io.emit("send", { rtrnData });
    // Remove the event listeners after sending the message
    client.bot.off('message_send', sendListener);
    client.bot.off('message_ack', ackListener);
    // Remove the logging of `sentMessage.ack`
  } catch (error) {
    console.error("Error sending message:", error);
    io.emit("send", { message: "Error sending message" });
    isSending = false; // Set isSending to false if there's an error
  }
}
  else return "client is not ready";
}

module.exports={sendNewMessage}