const campaignController = require("../DL/controllers/campaign.controller");
const userController = require("../DL/controllers/user.controller");
const { io } = require("socket.io-client");
const socket1 = io("http://localhost:3000"); //?
// TODO - socket2 ??
const { isValidObjectId } = require("./functions");

// TO SEND  specifi msg to camp's lead
async function sendSpecificMsgToCampaignLeads() {}

//TO GET MSG & LEAD
async function getMsgAndLead() {}

//RECIVED !!!

// THE MSG THAT WAS SENT TO LEADS
async function msgSentLeads() {}

//THE MSGS THAT DO NOT SENT TO LEADS
async function msgNotSentLeads(campaignObj, msgId) {
  const leadsInCampaign = campaignObj.leads;
  const sentLeadsResultsArray = await msgSentLeads(campaignObj, msgId);
  const NotSentLeadsArray = leadsInCampaign.filter(
    (campLead) =>
      !sentLeadsResultsArray.some((msgLead) => msgLead._id === campLead._id)
  );

  return NotSentLeadsArray;
}

// TO PUSH ALL CAMP LEADS TO THE MSG LEADS
async function pushAllCampaignLeadsToMsgLeads() {}

// TO UPDATE DTATUS MSG TO JUST ONE LEAD
async function updateStatusMsgOfOneLead() {}

// TODO ?? NECESSARY ?

socket1.on("connect", () => {
  console.log("Connected to server");
});

socket1.on("sent", async (data) => {
  try {
    console.log(data.rtrnData);
    // const res = await updateStatusMsgOfOneLead(data.rtrnData)  לצורך בדיקה הורדתי
    // console.log(res);
  } catch (err) {
    console.error(err);
  }
});

module.exports = {
  sendSpecificMsgToCampaignLeads,
  getMsgAndLead,
  msgSentLeads,
  msgNotSentLeads,
  pushAllCampaignLeadsToMsgLeads,
  updateStatusMsgOfOneLead,
};
