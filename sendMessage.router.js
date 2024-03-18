const express = require("express");
const router = express.Router();
const { clients } = require("./socket"); // יבוא משתנה clients מקובץ ה socket
const { sendMessage } = require("./BL/sendMessage");

router.get("/:botId/:message", async (req, res) => {
  const client = clients[req.params.botId];
  if (!client) {
    return res.status(404).send("Bot not found");
  }

  try {
    await client.bot.sendMessage("972503210090@c.us", req.params.message);
    return res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).send("Internal server error");
  }
});

router.get("/kobi", async (req, res) => {
  try {
    const user = req.user;
    const campaignId = req.campaignId;
    const msgId = req.msgId;
    const msg = await sendMessage(user, campaignId, msgId);
    res.send(msg);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
