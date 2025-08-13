import { Router } from "express";
import { authorization } from "../../controller/auth.controller.js";
import { createBreak, deleteBreak, getAllBreak, updateBreak } from "../../controller/break.controller.js";

const router = Router()

router
    .post('/break-off/create', authorization('SUPERADMIN', 'ADMIN'), createBreak)
    .get('/break-offs', authorization('SUPERADMIN', 'ADMIN'), getAllBreak)
    .put('/break-off/:id/update', authorization('SUPERADMIN', 'ADMIN'), updateBreak)
    .delete('/break-off/:id/delete', authorization('SUPERADMIN', 'ADMIN'), deleteBreak)

export default router