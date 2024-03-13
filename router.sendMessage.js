const express = require("express");
const router = express.Router();
const clients = require("./functions/clientInitialize");
router.get("/:botId/:message", async (req, res) => {
  const client = clients[req.params.botId];
  if (!client) {
    return res.status(404).send("Bot not found");
  }

  await client.bot.sendMessage("972503210090@c.us", req.params.message);
});

module.exports = router;
