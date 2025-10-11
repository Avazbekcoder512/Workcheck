import prisma from "../prisma/setup.js"
import { createShiftSchema } from "../validator/shift/create.js"
import { updateShiftSchema } from "../validator/shift/update.js"


const createShift = async (req, res) => {
    try {
        const { error, value } = createShiftSchema.validate(req.body, { abortEarly: false })

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

        await prisma.shift.create({
            data: {
                name: value.name,
                startTime: value.startTime,
                endTime: value.endTime,
            }
        })

        return res.status(201).send({
            success: true,
            message: "Navbatchilik muvaffaqiyatli yaratildi!"
        })
    } catch (error) {
        throw error
    }
}


const getAllShifts = async (req, res) => {
    try {
        const shifts = await prisma.shift.findMany();

        if (shifts.length === 0) {
            return res.status(404).send({
                success: false,
                error: "Navbatchilik topilmadi"
            })
        }

        return res.status(200).send({
            success: true,
            shifts
        })
    } catch (error) {
        throw error
    }
}


const updateShift = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: "Id noto'g'ri formatda!"
            })
        }

        const shift = await prisma.shift.findUnique({ where: { id } })

        if (!shift) {
            return res.status(404).send({
                success: false,
                error: "Navbatchilik topilmadi!"
            })
        }

        const { error, value } = updateShiftSchema.validate(req.body)

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

        await prisma.shift.update({
            where: { id },
            data: {
                name: value.name || shift.name,
                startTime: value.startTime || shift.startTime,
                endTime: value.endTime || shift.endTime
            }
        })

        return res.status(200).send({
            success: true,
            message: "Navbatchilik muvaffaqiyatli yangilandi!"
        })
    } catch (error) {
        throw error
    }
}

const deleteShift = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: "Id noto'g'ri formatda!"
            })
        }

        const shift = await prisma.shift.findUnique({ where: { id } })

        if (!shift) {
            return res.status(404).send({
                success: false,
                error: "Navbatchilik topilmadi!"
            })
        }

        await prisma.shift.delete({ where: { id } })

        return res.status(200).send({
            success: true,
            message: "Navbatchilik muvaffaqiyatli o'chirildi"
        })

    } catch (error) {
        throw error
    }
}

export { createShift, getAllShifts, updateShift, deleteShift }