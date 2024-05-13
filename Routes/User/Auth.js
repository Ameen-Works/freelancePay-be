const express = require("express");
const { login, register } = require("../../Controllers/User/Auth");
const { generateTokens } = require("../../Middlewares/tokenGenerator");
const { hashPassword } = require("../../Middlewares/protectPassword");
const router = express.Router();

// Route for user login
router.post("/login", login, generateTokens);

// Route for user registration
router.post("/register", hashPassword, register);

module.exports = router;
