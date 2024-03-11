const express = require("express");
const userRouter = express.Router();
const { getOneUser, getUsers } = require("../BL/account.service");

// get all users
userRouter.get("/", async (req, res) => {
  try {
    const users = getUsers();
    console.log("r", users);
    res.send(users);
  } catch (err) {
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

// get one user:
userRouter.get("/phone", async (req, res) => {
  try {
    console.log(req.params.phone);
    const phone = "0526563233";
    const user = await getOneUser(phone);
    console.log("r", user);
    res.send(user);
  } catch (err) {
    console.log(err);
    res
      .status(err.code || 500)
      .send({ msg: err.msg || "something went wrong" });
  }
});

module.exports = userRouter;
