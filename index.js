require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || "3000";
const SOCKET_URL = process.env.SOCKET_URL || "http://localhost:5000";
const db = require("./DL/db");
const { getUsers } = require("./BL/account.service");
const { Server } = require("socket.io");
const http = require("http");
// const socket1 = io(SOCKET_URL + PORT);
const { startClient } = require("./DL/controllers/clientInitialize");
const server = http.createServer(app);

db.connect();
const clientInitialize = require("./clientInitialize");
app.use(express.json());
const { createServer } = require("./socket");
const http = require("http");

const server = http.createServer(app);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);

const userModel = require("./DL/models/user.model");
const { route } = require("./router.sendMessage");

let users = [];

async function getUsers() {
  try {
    users = await userModel.find({});
    console.log(users[0]._id);
    clientInitialize.createWhatsAppClient(users[0]._id);

    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}
console.log(users);

createServer(server);
