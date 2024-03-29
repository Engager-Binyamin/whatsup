require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./DL/db");
db.connect();
app.use(express.json());
const http = require("http");
const { createServer, clients } = require("./socket"); // כאן מייבאים את createServer ואת המשתנה clients מקובץ ה socket
const router = require("./sendMessage.router"); // נייבא את הראוטר המוגדר בקובץ router.js
const { getDetailsToSend, sendMessage } = require("./BL/sendMessage");

const server = http.createServer(app);
app.use("/messages", router);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use("/sendmessage", router); // ראוט עבור שליחת הודעות
// let fakeCampaign = {campaignId:"65eda5d5a53246c4f887ce33","65eda5d5a53246c4f887ce34"}
createServer(server);
sendMessage({
  user: "65ed9c525b51ed6b4bd16107",
  campaignId: "65eda5d5a53246c4f887ce33",
  msgId: "65f69dabd3c8fc298aceb940",
});
