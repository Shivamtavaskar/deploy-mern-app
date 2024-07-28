const express = require("express");
const { signupValidation, loginValidation } = require("../middlewares/AuthValidation");
const {signup, login} = require("../Controllers/AuthController")
const router = express.Router();

router.post("/signup", signupValidation, signup)

router.post("/login", loginValidation, login)


module.exports = router;
