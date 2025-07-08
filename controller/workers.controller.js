import storage from "../helper/supabase.js"
import prisma from "../prisma/setup.js"
import { imageSchema } from "../validator/imageValidator/imageValidate.js"
import workerCreateSchema from "../validator/workerValidator/createValidate.js"
import updateWorkerSchema from "../validator/workerValidator/updateValidate.js"



const workerCreate = async (req, res) => {
    try {
        const { error, value } = workerCreateSchema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: 'Barcha maydonlarni toʻldiring!'
            })
        }

        if (req.file) {
            const { error, value } = imageSchema.validate(req.file, { abortEarly: true })
            if (error) {
                return res.status(400).send({
                    success: false,
                    error: error.details[0].message,
                });
            }
        } else {
            return res.status(400).send({
                success: false,
                error: 'Rasm fayl yubormadingiz!'
            })
        }

        const image = await storage.upload(req.file)

        await prisma.workers.create({
            data: {
                fullname: value.fullname,
                position: value.position,
                salary: value.salary,
                gender: value.gender,
                age: value.gender,
                passport: value.passport,
                phone: value.passport,
                is_active: value.is_active,
                image: image.url,
                image_path: image.path
            }
        })

        return res.status(201).send({
            success: true,
            error: false,
            message: 'Xodim muvaffaqiyatli yaratildi!'
        })

    } catch (error) {
        throw error
    }
}

const getAllWorkers = async (req, res) => {
    try {
        const workers = await prisma.workers.findMany()

        if (workers.length == 0) {
            return res.status(404).send({
                success: false,
                error: 'Xodimlar mavjud emas!'
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            workers
        })

    } catch (error) {
        throw error
    }
}

const getOneWorker = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: 'Id notoʻgʻri formatda!'
            })
        }

        const worker = await prisma.workers.findFirst({ where: { id } })

        if (!worker) {
            return res.status(404).send({
                success: false,
                error: 'Xodim topilmadi!'
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            worker
        })

    } catch (error) {
        throw error
    }
}

const workerUpdate = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: 'Id notoʻgʻri formatda!'
            })
        }

        const worker = await prisma.workers.findFirst({ where: { id } })

        const { error, value } = updateWorkerSchema.validate(req.body)

        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: 'Barcha maydonlarni toʻldiring!'
            })
        }

        const updatedWorker = {
            fullname: value.fullname || worker.fullname,
            position: value.position || worker.position,
            salary: value.salary || worker.salary,
            phone: value.phone || worker.phone,
            age: value.age || worker.age,
            gender: value.gender || worker.gender,
            passport: value.passport || worker.passport,
            is_active: value.is_active || worker.is_active
        }

        if (req.file) {
            const { error: imgError, value } = imageSchema.validate(req.file, { abortEarly: false })
            if (imgError) {
                return res.status(400).send({
                    success: false,
                    error: imgError.details[0].message
                })
            }

            if (worker.image_path) {
                await storage.delete(worker.image_path)
            }

            const image = await storage.upload(req.file)
            updatedWorker.image_path = image.path
            updatedWorker.image = image.url
        }

        await prisma.workers.update({
            where: { id },
            data: updatedWorker
        })

        return res.status(201).send({
            success: true,
            error: false,
            message: 'Xodim maʻlumotlari muvaffaqiyatli yangilandi!'
        })

    } catch (error) {
        throw error
    }
}

const deleteWorker = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: 'Id notoʻgʻri formatda!'
            })
        }

        const worker = await prisma.workers.findFirst({ where: { id } })

        if (!worker) {
            return res.status(404).send({
                success: false,
                error: 'Xodim topilmadi!'
            })
        }

        await storage.delete(worker.image_path)

        await prisma.workers.delete({
            where: { id }
        })

        return res.status(200).send({
            success: true,
            error: false,
            message: "Xodim muvaffaqiyatli oʻchirildi!"
        })
    } catch (error) {
        throw error
    }
}

export { workerCreate, getAllWorkers, getOneWorker, workerUpdate, deleteWorker }