const { Router } = require("express");
const passwordController = require("../controllers/password.controller.js");
const authController = require("../controllers/auth.controller.js");
const router = Router();

router
    .post("/login", authController.login)
    .post("/refresh", authController.refresh)
    .post("/logout", authController.logout)
    .post("/check/phone", passwordController.checkPhone)
    .post("/verify/code", passwordController.verifyCode)
    .post("/reset/password", passwordController.resetPassword);

module.exports = router;