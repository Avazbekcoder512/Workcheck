import { Router } from "express";
import {
    authentication,
    checkauth,
    indetification,
    logout,
    refresh,
} from "../../controller/auth.controller.js";
import {
    checkPhone,
    resetPassword,
    verifyCode,
} from "../../controller/password.controller.js";

const router = Router();

router
    .post("/login", authentication)
    .post("/refresh", refresh)
    .get("/check-auth", indetification, checkauth)
    .post("/logout", logout)
    .post("/check/phone", checkPhone)
    .post("/verify/code", verifyCode)
    .post("/reset/password", resetPassword);

export default router;
