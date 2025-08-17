import { Router } from "express";
import { createDayyOff, deleteDayyOff, getAllDayOffs } from "../../controller/dayoff.controller.js";
import { authorization } from "../../controller/auth.controller.js";

const router = Router()

router
.post('/day-off/create', authorization('SUPERADMIN', 'ADMIN'), createDayyOff)
.get('/day-offs', authorization('SUPERADMIN', 'ADMIN'), getAllDayOffs)
.delete('/day-offs/:id/delete', authorization('SUPERADMIN', 'ADMIN'), deleteDayyOff)

export default router