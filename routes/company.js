const express = require("express");
const router = express.Router();
const { fetchMessages } = require("../controllers/company");

router.route("/messages").get(fetchMessages);

module.exports = router;
