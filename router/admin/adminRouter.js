import express from "express"
import { adminCreate, getAllAdmins } from "../../controller/admin.controller.js"

const router = express.Router()

router
.post('/admin/create', adminCreate)
.get('/admins', getAllAdmins)

export default router