const express = require("express");
const router = express.Router();
const { clients } = require("./clients"); // יבוא משתנה clients מקובץ ה socket
const { addMsgToQueue } = require("./msgQueue.service2");

router.get("/:botId/:message", async (req, res) => {
  const client = clients[req.params.botId];
  if (!client) {
    return res.status(404).send("Bot not found");
  }

  try {
    await addMsgToQueue(
      [
        {
          userId: "65ed9c525b51ed6b4bd16107",
          leadId: "65eda5d5a53246c4f887ce37",
          contentMsg: "yeeeeeeeeeee",
          timeToSend: 1710420624627,
          campaignId: "65eda5d5a53246c4f887ce33",
        },
        {
          userId: "65ed9c525b51ed6b4bd16107",
          leadId: "65eda5d5a53246c4f887ce37",
          contentMsg: "yooooooooooooooooooo",
          timeToSend: 1710420624627,
          campaignId: "65eda5d5a53246c4f887ce33",
        },
        {
          userId: "65ed9c525b51ed6b4bd16107",
          leadId: "65eda5d5a53246c4f887ce37",
          contentMsg: "yllllllllllllllleee",
          timeToSend: 1710420624627,
          campaignId: "65eda5d5a53246c4f887ce33",
        },
      ],
      "65ed9c525b51ed6b4bd16107"
    );
    return res.status(200).send("Message sent successfully");
  } catch (error) {
    console.error("Error sending message:", error);
    return res.status(500).send("Internal server error");
  }
});

module.exports = router;
