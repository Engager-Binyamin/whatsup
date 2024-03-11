const express = require("express");
const mainRouter = express.Router();
const messagesRouter = require("./messages.route");
const userRouter = require("./user.route");

mainRouter.use("/user", userRouter);
mainRouter.use("/messages", messagesRouter);

module.exports = mainRouter;
