require("dotenv").config();
const express = require("express");
const mainRouter = require("./routes");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 3000;
const db = require("./DL/db");
const { getUsers } = require("./BL/account.service");
const { io } = require("socket.io-client");
const socket1 = io("http://localhost:" + PORT);

db.connect();
app.use("/whatsUpServer", mainRouter);
app.use(express.json());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
  //   getUsers()
});
