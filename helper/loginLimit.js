import prisma from "../prisma/setup.js"
import { loginSchema } from "../validator/authValidator/authValidate.js"


const checkBlock = async (req, res, next) => {
    try {
        const schema = loginSchema(req)
        const ip = req.ip
        const { error, value } = schema.validate(req.body)
        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: req.__('error.value')
            })
        }

        const admin = await prisma.admins.findFirst({
            where: {
                username: value.username
            }
        })

        const blockKey = {
            username: admin ? value.username : null,
            ipAddress: ip
        }

        const block = await prisma.loginBlock.findFirst({
            where: { username_ipAddress: blockKey }
        })

        if (block && block.blockedUntil > new Date()) {
            return res.status(429).send({
                success: false,
                error: `Bloklangan. Qaytadan urinishingiz mumkin: ${block.blockedUntil.toISOString()}.`
            })
        }

        next()
    } catch (error) {
        throw error
    }
}