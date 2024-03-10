const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const db = require("./DL/db");
db.connect();
const client = require("./clientInitialize");
app.use(express.json());
app.use(cors());

const userModel = require("./DL/models/user.model");

let usersId = [];

async function getUsers() {
  try {
    const users = await userModel.find({});
    usersId = users.map((user) => user._id);
    usersId.forEach((userId) => {
      client.startClient(userId);
    });
    return users;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
}

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
  getUsers();
});
