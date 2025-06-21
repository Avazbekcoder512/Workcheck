import express from "express"
import { adminCreate, deleteAdmin, getAllAdmins, updateAdmin, updatePassword } from "../../controller/admin.controller.js"
import { authorization } from "../../controller/auth.controller.js"

const router = express.Router()

router
.post('/admin/create', authorization('SUPERADMIN'), adminCreate)
.get('/admins', authorization('ADMIN', 'SUPERADMIN'), getAllAdmins)
.put('/admin/:id/update', authorization('SUPERADMIN'), updateAdmin)
.put('/admin/:id/updatepass', authorization('SUPERADMIN'), updatePassword)
.delete('/admin/:id/delete', authorization('SUPERADMIN'), deleteAdmin)

export default router