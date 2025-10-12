const passwordService = require('../services/password.service')
class passwordController {
    async checkPhone(req, res, next) {
        try {
            const data = req.body
            const code = await passwordService.checkPhone(req, data)

            return res.status(200).json({
                success: true,
                code: code.verifyCode
            })
        } catch (error) {
            next(error)
        }
    }

    async verifyCode(req, res, next) {
        try {
            const data = req.body
            const verify = await passwordService.verifyCode(req, data)

            return res.status(200).json({
                success: true
            })
        } catch (error) {
            next(error)
        }
    }

    async resetPassword (req, res, next) {
        try {
            const data = req.body
            const result = await passwordService.resetPassword(req, data)

            return res.status(200).json({
                success: true,
                message: "Parol yangilandi!"
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new passwordController()