const { Router } = require("express");
// import {
//   authentication,
//   checkauth,
//   indetification,
//   logout,
//   refresh,
// } from "../../controller/auth.controller.js";
const passwordController = require("../controllers/password.controller.js");
const router = Router();

router
  .post("/login", authentication)
  .post("/refresh", refresh)
  .get("/check-auth", indetification, checkauth)
  .post("/logout", logout)
  .post("/check/phone", passwordController.checkPhone)
  .post("/verify/code", passwordController.verifyCode)
  .post("/reset/password", passwordController.resetPassword);

module.exports = router;