import { Router } from "express";
import { indetification } from "../../controller/auth.controller";
import { profile } from "../../controller/profile.controller";

const router = Router()

router
.get('/profile', indetification, profile)