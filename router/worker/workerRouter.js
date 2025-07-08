import { Router } from 'express'
import { deleteWorker, getAllWorkers, getOneWorker, workerCreate, workerUpdate } from '../../controller/workers.controller.js'

const router = Router()

router
.post('/worker/create', workerCreate)
.get('/workers', getAllWorkers)
.get('worker/:id', getOneWorker)
.put('/worker/:id/update', workerUpdate)
.delete('/woker/:id/delete', deleteWorker)

export default router