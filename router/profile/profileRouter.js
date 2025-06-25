import { Router } from "express";
import { indetification } from "../../controller/auth.controller.js";
import { profile } from "../../controller/profile.controller.js";

const router = Router()

router
.get('/profile', indetification, profile)

export default router