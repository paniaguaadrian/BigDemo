import express from "express";

// Controllers imported
import {
  sendRJ1FormEmails,
  sendRJ2FormEmails,
  sendRJ11Emails,
  sendRJ12Emails,
  sendPMEmails,
  sendRJ13Email,
  sendRJ3FormEmail,
  sendRJ15EmailsTT,
  sendRJ15EmailsPM,
  sendRJSFormEmail,
  sendRJ3FilesEmail,
  sendRJ18EmailTT,
  sendRJ18EmailPM,
  sendNotificationRimbo,
} from "../controllers/emailsController.js";

const router = express.Router();

router.route("/rj1").post(sendRJ1FormEmails);
router.route("/rj2/tt").post(sendRJ2FormEmails);
router.route("/rj2/rimbo").post(sendRJ3FilesEmail);
router.route("/e2r").post(sendNotificationRimbo);
router.route("/rj11").post(sendRJ11Emails);
router.route("/rj12").post(sendRJ12Emails);
router.route("/rjpm").post(sendPMEmails);
router.route("/rj13").post(sendRJ13Email);
router.route("/rj3").post(sendRJ3FormEmail);
router.route("/rj15/tt").post(sendRJ15EmailsTT);
router.route("/rj15/pm").post(sendRJ15EmailsPM);
router.route("/rjs").post(sendRJSFormEmail);
router.route("/rj18tt").post(sendRJ18EmailTT);
router.route("/rj18pm").post(sendRJ18EmailPM);

export default router;
