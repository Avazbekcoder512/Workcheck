const { Router } = require('express')
const dayoffController = require('../controllers/dayoff.controller')

const router = Router()

router
    .post('/day-off/create', authorization('SUPERADMIN', 'ADMIN'), dayoffController.create)
    .get('/day-offs', authorization('SUPERADMIN', 'ADMIN'), dayoffController.getAll)
    .delete('/day-offs/:id/delete', authorization('SUPERADMIN', 'ADMIN'), dayoffController.delete)

module.exports = router