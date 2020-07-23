const express = require("express");
const router = express.Router();
const { sendMail } = require("../controllers/users");

router.route("/sendmail").post(sendMail);

module.exports = router;
