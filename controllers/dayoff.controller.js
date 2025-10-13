const dayoffService = require("../services/dayoff.service")

class dayOffController {
    async create(req, res, next) {
        try {
            const data = req.body

            const dayOff = await dayoffService.create(req, data)

            return res.status(201).json({
                success: true,
                message: "Dam olish kuni yaratildi!",
                dayOff
            })
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const dayOffs = await dayoffService.getAll(req)

            return res.status(200).json({
                success: true,
                dayOffs
            })
        } catch (error) {
            next(error)
        }
    }

    async delete(req, res, next) {
        try {
            const paramsId = req.params.id

            const dayOff = await dayoffService.delete(req, paramsId)

            return res.status(200).json({
                success: true,
                message: "Dam olish kuni o'chirildi!"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new dayOffController()