const userController = require("../DL/controllers/user.controller");

// get all users
async function getUsers() {
  let users = await userController.read();
  console.log("s", users);
  if (!users) {
    throw { code: 408, msg: "something went wrong" };
  }
  return users;
}

// get one user:
async function getOneUser(phone) {
  let user = await userController.readOne({ phone: phone });
  console.log("s", user);
  if (!user) {
    throw { code: 408, msg: "The phone is not exist" };
  }
  return user;
}

module.exports = {
  getUsers,
  getOneUser,
};
