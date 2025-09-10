import prisma from "../prisma/setup.js"
import { createDayOffSchema } from "../validator/dayOff/dayoff.js"


const createDayyOff = async (req, res) => {
    try {
        const { error, value } = createDayOffSchema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: "Ma'lumotlar kelmadi!"
            })
        }

        await prisma.dayOff.create({
            data: {
                name: value.name,
                dates: {
                    create: value.dates.map(date => ({ date }))
                }
            },
            include: {
                dates: true
            }
        })

        return res.status(200).send({
            success: true,
            message: "Dam olish kuni muvaffaqiyatli yaratildi!"
        })
    } catch (error) {
        throw error
    }
}

const getAllDayOffs = async (req, res) => {
    try {
        const dayOffs = await prisma.dayOff.findMany({
            select: {
                id: true,
                name: true,
                dates: true
            }
        })

        if (dayOffs.length === 0) {
            return res.status(404).send({
                success: false,
                error: "Dam olish kunlari mavjud emas!"
            })
        }

        return res.status(200).send({
            success: true,
            dayOffs
        })
    } catch (error) {
        throw error
    }
}

const deleteDayyOff = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: "Id noto'g'ri formatda!"
            })
        }

        const dayOff = await prisma.dayOff.findUnique({ where: { id } })

        if (!dayOff) {
            return res.status(404).send({
                success: false,
                error: "Dam olish kuni topilmadi!"
            })
        }

        await prisma.dayOff.delete({ where: { id } })

        return res.status(200).send({
            success: true,
            message: "Dam olish kuni muvaffaqiyatli oʻchirildi!"
        })
    } catch (error) {
        throw error
    }
}

export { createDayyOff, getAllDayOffs, deleteDayyOff }