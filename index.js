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
app.use("/message", mainRouter);
app.use(express.json());
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

io.on("qr", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on("qr", (data) => {
    console.log("hello");
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  //   getUsers()
});
