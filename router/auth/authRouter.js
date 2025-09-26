import { Router } from "express";
import { authentication, checkauth, indetification, logout, refresh } from "../../controller/auth.controller.js";
import { checkPhone } from "../../controller/password.controller.js";


const router = Router()

router
    .post('/login', authentication)
    .post('/refresh', refresh)
    .get('/check-auth', indetification, checkauth)
    .post('/logout', logout)
    .post('/check/phone', checkPhone)

export default router