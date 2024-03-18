const campaignController = require("../DL/controllers/campaign.controller");

// /message/send
// מקבל user כטוקן
// מקבל מזהה קמפיין ומזהה הודעה
// שולף לידים ופרטים נחוצים לפי הקמפיין + פרטי הודעה לפי מזהה הודעה - ______
// מעביר לפונ' הזרקת משתנים דינאמיים - אריה
// שומר כל הודעה בטבלת "תור עבודה" לפי אלגוריתם של דיליי - מרים

async function sendMessage(msg) {
  // body - user id,campaign id, massage id,
  try {
    console.log({ msg: msg });
    const { user, campaignId, msgId } = msg;
    let details = await getDetailsToSend(campaignId, msgId);
    let msgToSend = await injectionDataToMsg(details);
    let result = await sendMessageToQuete(user, campaignId, msgToSend);
    return result;
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
  let leadsArr = [];
  campaign.leads.map((lead) => {
    if (lead.isActive == true) {
      leadsArr.push(lead);
    }
  });
  let msgContent = msg.content;
  return {
    leadsArr,
    msgId,
    msgContent,
  };
}

function injectionDataToMsg(msg) {
  const { leadsArr, msgId, msgContent } = msg;
  if (!msgContent.includes("@")) {
    massege = leadsArr.map((lead) => {
      return { lead: lead._id, msgId, msgContent: msgContent };
    });
    return massege;
  } else {
    const fields = leadsArr[0];
    massege = leadsArr.map((lead) => {
      let namePattern = new RegExp("\\@" + fields[0], "g");
      let orderMsg = msgContent.replaceAll(namePattern, lead.fullName);
      let emailPattern = new RegExp("\\@" + fields[1], "g");
      orderMsg = orderMsg.replaceAll(emailPattern, lead.email);
      let phonePattern = new RegExp("\\@" + fields[2], "g");
      orderMsg = orderMsg.replaceAll(phonePattern, lead.phone);
      return { lead: lead._id, msgId, content: orderMsg };
    });
  }
  return massege;
}
module.exports = { sendMessage, getDetailsToSend };
