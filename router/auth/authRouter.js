import { Router } from "express";
import { authentication, logout, refresh } from "../../controller/auth.controller.js";


const router = Router()

router
.post('/login', authentication)
.post('/refresh', refresh)
.post('/logout', logout)

export default router