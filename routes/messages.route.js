const express = require("express");
const router = express.Router();

router.get(
  "/whatsapp/camp/:idCamp/msg/:msgId/lead/:leadId",
  async (req, res) => {
    try {
      // TODO funcion to the middleware

      // if(user.subscription !== "trial" && user.subscription !== "active")throw { code: 480, msg: "The user without proper authorization" };

      const idCamp = req.params.idCamp;
      const msgId = req.params.msgId;
      const leadId = req.params.leadId;

      const msg = await campaignService.getMsgAndLead(idCamp, msgId, leadId);
      res.send(msg);
    } catch (err) {
      res.status(444).send(err.msg);
    }
  }
);

router.put(
  "/whatsapp/camp/:campId/msg/:msgId/lead/:leadId/newStatus/:newStatus",
  async (req, res) => {
    try {
      // TODO funcion to the middleware
      // if(user.subscription !== "trial" && user.subscription !== "active")throw { code: 480, msg: "The user without proper authorization" };
      const campId = req.params.campId;
      const msgId = req.params.msgId;
      const leadId = req.params.leadId;
      const newStatus = req.params.newStatus;
      const ans = await campaignService.updateStatusMsgOfOneLead(
        campId,
        msgId,
        leadId,
        newStatus
      );
      res.send(ans);
    } catch (err) {
      console.log(err);
      res.status(405).send(err.msg);
    }
  }
);

module.exports = router;
