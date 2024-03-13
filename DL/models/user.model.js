const mongoose = require("mongoose");
const db = require("../db")

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,

  },
  password: {
    type: String,
    // required: true,
    // אביעד אמר לא לעשות סיסמה חובה בגלל שאנשים נכנסים עם גוגל וכד'
    // select: false,

  },
  phone: {
    type: String,
    required: true,
  },

  isActive: {
    type: Boolean,
    default: true
  },

  campaigns: [
    {
      campaign: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "campaign",
      },
    },
  ],

  subscription: {
    type : String, 
    enum : ['trial', 'active', 'expired'],
    default : 'trial'
  },

  createdData : {
    type: Date,
    default: Date.now()
  },

  messagesSent : {
    type: Number, 
    default: 0
  }

});

const userModel = mongoose.model("user", userSchema);

// async function create  () {
//   const newUser = new userModel({
//     name: "eliraz",
//     email: "eliraz@gmail.com",
//     password: "123456",
//     phone: "0503210090",
//   });
//   const result = await newUser.save();
//   console.log(result);
//   return result;
// };

// create()

module.exports = userModel;

