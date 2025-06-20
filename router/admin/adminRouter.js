import express from "express"
import { adminCreate, getAllAdmins } from "../../controller/admin.controller.js"
import { authorization } from "../../controller/auth.controller.js"

const router = express.Router()

router
.post('/admin/create', authorization('SUPERADMIN'), adminCreate)
.get('/admins', authorization("ADMIN"), getAllAdmins)

export default router