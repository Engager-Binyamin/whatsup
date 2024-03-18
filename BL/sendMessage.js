const campaignController = require("../DL/controllers/campaign.controller");

// /message/send
// מקבל user כטוקן
// מקבל מזהה קמפיין ומזהה הודעה
// שולף לידים ופרטים נחוצים לפי הקמפיין + פרטי הודעה לפי מזהה הודעה - ______
// מעביר לפונ' הזרקת משתנים דינאמיים - אריה
// שומר כל הודעה בטבלת "תור עבודה" לפי אלגוריתם של דיליי - מרים

async function sendMessage(body) {
  // body - user id,campaign id, massage id,
  try {
    const { user, campaignId, msgId } = body;
    let details = await getDetailsToSend(campaignId, msgId);
    let msgToSend = await injectionDataToMsg(details);
    // console.log(msgToSend);
    // let result = await sendMessageToQuete(user, campaignId, msgToSend);
  } catch (err) {}
}

async function getDetailsToSend(campaignId, msgId) {
  // שולפת לידים שלא קיבלו הודעה והם פעילים
  //  שולפת את ההודעה המלאה
  let campaign = await campaignController.readOne({
    _id: campaignId,
    "msg._id": msgId,
  });
  if (!campaign) throw { msg: "no messeges in this campaign", code: 404 };

  let msg = campaign.msg.find((m) => m._id == msgId);
  // console.log("msg in details:", msg);
  let leadsArr = [];
  campaign.leads.map((lead) => {
    if (lead.isActive == true) {
      leadsArr.push(lead);
    }
  });
// console.log("leadsArr in first function", leadsArr);
let msgContent = msg.content;
// console.log("msgC", msgContent);
return {
  leadsArr,
  msgId,
  msgContent,
};
}

function injectionDataToMsg(msg) {
  const { leadsArr, msgId, msgContent } = msg;
  const newLeads = leadsArr.map(l=>{return {...l._doc}})
  // console.log("leadsArr in second function",  newLeads);

  if (!msgContent.includes("@")) {
    massege = leadsArr.map((lead) => {
      return { lead: lead._id, msgId, msgContent: msgContent };
    });
    return massege;
  } else {
    const fields = Object.keys(newLeads[0]);
    // console.log( fields );
    massege = newLeads.map((lead) => {
      let orderMsg = msgContent
      fields.forEach(field=>{
        orderMsg = orderMsg.replaceAll(new RegExp("\\@" +field, "g"), lead[field]);
      })
      
      return {lead:lead._id, msgId ,content:orderMsg}
    });
  }
  console.log(massege);
  return massege;
}
module.exports = { sendMessage, getDetailsToSend };
