const express = require("express");
const { authenticate } = require("../../Middlewares/Authenticate");
const { profile } = require("../../Controllers/User/Profile");

const router = express.Router();

router.get("/data", authenticate, profile);

module.exports = router;
