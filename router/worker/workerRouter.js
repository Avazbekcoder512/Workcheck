import { Router } from 'express'
import { deleteWorker, getAllWorkers, getOneWorker, workerCreate, workerUpdate } from '../../controller/workers.controller.js'
import { authorization } from '../../controller/auth.controller.js'
import upload from '../../helper/multer.js'

const router = Router()

router
.post('/worker/create', authorization('SUPERADMIN', 'ADMIN'), upload.single('image'), workerCreate)
.get('/workers', authorization('SUPERADMIN', 'ADMIN'), getAllWorkers)
.get('worker/:id', authorization('SUPERADMIN', 'ADMIN'), getOneWorker)
.put('/worker/:id/update', authorization('SUPERADMIN', 'ADMIN'), upload.single('image'), workerUpdate)
.delete('/woker/:id/delete', authorization('SUPERADMIN'), deleteWorker)

export default router