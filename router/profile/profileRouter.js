import { Router } from "express";
import { indetification } from "../../controller/auth.controller.js";
import { profile, updateProfile } from "../../controller/profile.controller.js";
import upload from "../../helper/multer.js";

const router = Router()

router
.get('/profile', indetification, profile)
.put('/profile/update', indetification, upload.single('image'), updateProfile)

export default router