import prisma from "../prisma/setup.js"
import { createBreakSchema } from "../validator/break/create.js"
import { updateBreakSchema } from "../validator/break/update.js"


const createBreak = async (req, res) => {
    try {
        const { error, value } = createBreakSchema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        const breakOff = await prisma.break.findFirst({
            where: {
                name: value.name
            }
        })

        if (breakOff) {
            return res.status(400).send({
                success: false,
                error: "Bunday tanaffus allaqachon yaratilgan!"
            })
        }

        await prisma.break.create({
            data: {
                name: value.name,
                startTime: value.startTime,
                endTime: value.endTime
            }
        })

        return res.status(200).send({
            success: true,
            message: "Tanaffus muvoffaqiyatli yaratildi!"
        })
    } catch (error) {
        throw error
    }
}

const getAllBreak = async (req, res) => {
    try {
        const breakoffs = await prisma.break.findMany()

        if (breakoffs.length == 0) {
            return res.status(404).send({
                success: false,
                error: "Tanaffuslar xozircha mavjud emas!"
            })
        }

        return res.status(200).send({
            success: true,
            breakoffs
        })
    } catch (error) {
        throw error
    }
}

const updateBreak = async (req, res) => {
    try {

        const { id } = req.params

        if (isNaN(id)) {
            return res.status(400).send({
                success: false, error: req.__('error.id')
            });
        }

        const breakOff = await prisma.break.findUnique({ where: id })

        if (!breakOff) {
            return res.status(404).send({
                success: false,
                error: "Tanaffus topilmadi!"
            })
        }

        const { error, value } = updateBreakSchema.validate(req.body,)

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        await prisma.break.update({
            where: id,
            data: {
                name: value.name || breakOff.name,
                startTime: value.startTime || breakOff.startTime,
                endTime: value.endTime || breakOff.endTime
            }
        })

        return res.status(200).send({
            success: true,
            message: 'Tanaffus muvaffaqiyatli yangilandi!'
        })

    } catch (error) {
        throw error
    }
}

const deleteBreak = async (req, res) => {
    try {
        const { id } = req.params

        if (isNaN(id)) {
            return res.status(400).send({
                success: false, error: req.__('error.id')
            });
        }

        const breakOff = await prisma.break.findUnique({ where: id })

        if (!breakOff) {
            return res.status(404).send({
                success: false,
                error: "Tanaffus topilmadi!"
            })
        }

        await prisma.break.delete({ where: id })

        return res.status(200).send({
            success: true,
            error: 'Tanaffus muvaffaqiyatli oʻchirildi!'
        })

    } catch (error) {
        throw error
    }
}

export { createBreak, getAllBreak, updateBreak, deleteBreak }