import { Router } from "express";
import { authorization } from "../../controller/auth.controller.js";
import { createBranch, deleteBranch, getAllBranches, getOneBranch, updateBranch } from "../../controller/branch.controller.js";

const router = Router()

router
.post('/branch/create', authorization('SUPERADMIN', 'ADMIN'), createBranch)
.get('/branches', authorization('SUPERADMIN', 'ADMIN'), getAllBranches)
.get('/branch/:id', authorization('SUPERADMIN', 'ADMIN'), getOneBranch)
.put('/branch/:id/update', authorization('SUPERADMIN', 'ADMIN'), updateBranch)
.delete('/branch/:id/delete', authorization('SUPERADMIN', 'ADMIN'), deleteBranch)


export default router