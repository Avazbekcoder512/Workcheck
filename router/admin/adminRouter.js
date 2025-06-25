import express from "express"
import { adminCreate, deleteAdmin, getAllAdmins, getOneAdmin, updateAdmin, updatePassword } from "../../controller/admin.controller.js"
import { authorization } from "../../controller/auth.controller.js"
// import { upload, uploadImage } from "../../helper/supabase.js"

const router = express.Router()

router
    .post('/admin/create', authorization('SUPERADMIN', 'ADMIN'), /* upload.single('image'), uploadImage, */ adminCreate)
    .get('/admins', authorization('ADMIN', 'SUPERADMIN'), getAllAdmins)
    .get('/admin/:id', authorization('SUPERADMIN'), getOneAdmin)
    .put('/admin/:id/update', authorization('SUPERADMIN'), updateAdmin)
    .put('/admin/:id/updatepass', authorization('SUPERADMIN'), updatePassword)
    .delete('/admin/:id/delete', authorization('SUPERADMIN'), deleteAdmin)

export default router