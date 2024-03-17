let isSending = false;
async function sendNewMessage(data, socket,client ) {
  console.log(data);
  const rtrnData = {
    _idL: data._idL,
    _idM: data._idM,
    idC: data.idC,
    issend: "Message sent successfully"
  };

  const newData = data;
  const chatId = `972${Number(newData.phone)}@c.us`;
  try {
    let messageId;
    let sentMessage;
    // Define the event listener functions
    const sendListener = (msg) => {
      if (msg.id.fromMe && msg.to === chatId) {
        messageId = msg.id.id;
        sentMessage = msg;
        console.log(`Message with ID ${messageId} was sent to ${chatId}`);
      }
    };
    const ackListener = (msg, ack) => {
      if (msg.id.id === messageId) {
        if (ack === 1) {
            console.log(`Message with ID ${messageId} was sent`)
        }else if (ack === 2) {
          console.log(`Message with ID ${messageId} was received by ${chatId}`);
          isSending = false; // Set isSending to false when the message is received
        } else if (ack === 3) {
          console.log(`Message with ID ${messageId} was read by ${chatId}`);
        } else{
            console.log("something ins't right")
        }
      }
    };
    isSending = true; // Set isSending to true before sending the message
    // Add the event listeners
    client.on('message_send', sendListener)
    client.on('message_send', async ()=> {
        console.log(sendListener)
    });
    client.on('message_ack', ackListener)
    client.on('message_ack', async (msg, ack) => {
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
    if (newData.withName) {
      sentMessage = await client.sendMessage(chatId, `Hello ${newData.name}, ${newData.msg}`);
    } else {
      sentMessage = await client.sendMessage(chatId, newData.msg);
    }
    if (media) {
      await client.sendMessage(chatId, media);
    }
    io.emit("send", { rtrnData });
    // Remove the event listeners after sending the message
    client.off('message_send', sendListener);
    client.off('message_ack', ackListener);
    // Remove the logging of `sentMessage.ack`
  } catch (error) {
    console.error("Error sending message:", error);
    io.emit("send", { message: "Error sending message" });
    isSending = false; // Set isSending to false if there's an error
  }
}
