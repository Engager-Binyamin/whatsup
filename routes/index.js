const express = require("express");
const mainRouter = express.Router();
const { sendMessageService } = require("../BL/sendMessage");
const { sendToWhatsUp } = require("../BL/sendToWhatsUp");

// message/send/
// שליחת הודעה יזומה
//  מקבל יוזר כטוקן
//  מקבל מזהה קמפיין ומזהה הודעה
// שולף לידים ופרטים נחוצים לפי הקמפיין + פרטי הודעה לפי מזהה הודעה
// מעביר לפונ' הזרקת משתנים דינאמיים
// שומר כל הודעה בטבלת "תור עבודה" לפי אלגוריתם של דיליי

mainRouter.post("/send", async (req, res) => {
  try {
    let msg = {
      userId: req.body.userId,
      campaignId: req.body.campaignId,
      msgId: req.body.msgId,
    };
    sendMessageService(msg, res);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// /verification
// אישור משתמש על ידי צבי
//  מקבל משתמש וקישור עם טוקן
// שולח הודעת  התנעה עם קישור ובקשה לאישור
mainRouter.post("/send/verify", async (req, res) => {
  try {
    let msg = {
      userId: req.body.userId,
      campaignId: req.body.campaignId,
      msgId: req.body.msgId,
    };
    sendToWhatsUp(msg);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

//   message/send/jobs/
//   שליחת הודעה בתזמון מאוחר
// כשנשמר התזמון של הודעה )הוספת הודעה חדשה או עדכון( - קורה בשרת המרכזי
// ויש בקשה מהמרכזי לסרוויס הנ"ל עם כל הפרטים.
// מבצע את אותן פעולות כמו בשליחת הודעה יזומה
//  צריך להוסיף לטבלת "Job של השרת" )תזמוני השרת( פעולה להפעיל תור עבודה
// בתאריך-שעה שרצו לתזמן את ההודעות.

mainRouter.post("/send/jobs/", async (req, res) => {
  try {
    res.send(qr);
  } catch (err) {
    res.send(err);
  }
});

//   message/lead/:leadId/
//   הודעת התנעה - הודעת 0
//    כאשר יש ליד חדש שנכנס לקמפיין )מ-webhook , ידני או מקובץ( - קורה בשרת
//   המרכזי ויש בקשה מהמרכזי לסרוויס הנ"ל עם כל הפרטים.
//    נכנס לתור עבודה כמו שליחת הודעה יזומה.

mainRouter.post("/send/lead/:leadId/", async (req, res) => {
  try {
    res.send(qr);
  } catch (err) {
    res.send(err);
  }
});

mainRouter.post("/update/jobs", async (req, res) => {
  try {
    const userId = req.body.userId;
    console.log(userId);
    const result = await msgQueueService.createNewQueue(userId);
    res.send(`im from the whatsapp this is the user id you sent me:${userId}`);
  } catch (err) {
    res.send(err);
  }
});

module.exports = mainRouter;
