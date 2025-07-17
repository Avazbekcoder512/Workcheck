import { Router } from "express";
import { indetification } from "../../controller/auth.controller.js";
import { profile, updateProfile } from "../../controller/profile.controller.js";

const router = Router()

router
.get('/profile', indetification, profile)
.put('/profile/update', indetification, updateProfile)

export default router