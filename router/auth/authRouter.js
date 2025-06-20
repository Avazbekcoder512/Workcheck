import { Router } from "express";
import { authentication, logout } from "../../controller/auth.controller.js";


const router = Router()

router
.post('/login', authentication)
.get('/logout', logout)

export default router