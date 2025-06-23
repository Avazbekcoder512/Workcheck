import { Router } from "express";
import { authentication, checkauth, indetification, logout, profile, refresh } from "../../controller/auth.controller.js";


const router = Router()

router
.post('/login', authentication)
.post('/refresh', refresh)
.get('/check-auth', indetification, checkauth)
.get('/profile', indetification, profile)
.post('/logout', logout)

export default router