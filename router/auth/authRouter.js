import { Router } from "express";
import { authentication, indetification, logout, profile, refresh } from "../../controller/auth.controller.js";


const router = Router()

router
.post('/login', authentication)
.post('/refresh', refresh)
.get('/profile', indetification, profile)
.post('/logout', logout)

export default router