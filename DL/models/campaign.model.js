const mongoose = require("mongoose");
const db = require("../db")
db.connect();
const client = require('../../clientInitialize');

const receivedMsg = new mongoose.Schema({
  leadId: {
    type: mongoose.SchemaTypes.ObjectId
  },
  msgId: {
    type: mongoose.SchemaTypes.ObjectId

  },
  status: {
    type: String,
    enum: ["created", "sent", "received"],
    default: "created",

  },
  sentData: {
    type: Date,
    default: Date.now
  }

})
const leadSchema = new mongoose.Schema({
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    default: ''
    // ???OK
  },
  phone: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
    default: ''
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },

});
const msgSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  creationDate: {
    type: Date,
    default: Date.now,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  // TODO: check if this property needs to be removed
  status: {
    type: String,
    enum: ["created", "sent", "received"],
    default: "created",

  }
});

const campaignSchema = new mongoose.Schema({
  user: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    default: "65ba97e536d6af41e9beb0d1",
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,

  },
  isActive: {
    type: Boolean,
    default: true,
  },
  img: {
    type: String,
  },
  webhook: {
    type: String,
  },

  msg: [msgSchema],
  leads: [leadSchema],
  receivedMsgs: [receivedMsg],



});

const campaignModel = mongoose.model("campaign", campaignSchema);

async function getCampaigns(userId) {
  try {
    const campaigns = await campaignModel.findById(userId);
    // client.startClient(userId, campaigns);
    console.log(campaigns.msg.map(msg => msg.content));
    return campaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
  }
}


getCampaigns("65eda5d5a53246c4f887ce33");

module.exports = campaignModel;

