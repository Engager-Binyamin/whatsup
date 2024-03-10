const sampleData = {
  _idL: "123",
  _idM: "456",
  idC: "789",
  phone: "0503210090", // Replace with the actual phone number
  withName: true,
  name: "elirazoooosh",
  msg: "Hello, how are you?",
  file: "https://www.gov.il/BlobFolder/homepage/new-home-page/he/428_487.jpg ", // Replace with the actual file path if needed
};

function delay_between_messages(campId, messageId) {
  async function sendNewMessage(data) {
    const rtrnData = {
      leadId: data._idL,
      messageId: data._idM,
      campId: data.idC,
      issend: "recieved",
    };

    const newData = data;
    const chatId = `972${Number(newData.phone)}@c.us`;

    try {
      let media;
      if (data.file) {
        media = await MessageMedia.fromUrl(data.file);
      }

      if (newData.withName) {
        await client.sendMessage(
          chatId,
          `שלום ${newData.name}, ${newData.msg}`
        );
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
}
export default { delay_between_messages };
