import { Router } from "express";
import { authorization } from "../../controller/auth.controller.js";
import { createShift, deleteShift, getAllShifts, updateShift } from "../../controller/shift.controller.js";

const router = Router()

router
.post('/shift/create', authorization('SUPERADMIN', 'ADMIN'), createShift)
.get('/shifts', authorization('SUPERADMIN', 'ADMIN'), getAllShifts)
.put('/shift/:id/update', authorization('SUPERADMIN', 'ADMIN'), updateShift)
.delete('/shift/:id/delete', authorization('SUPERADMIN', 'ADMIN'), deleteShift)

export default router