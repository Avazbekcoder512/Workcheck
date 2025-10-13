const { checkId } = require("../helper/checkId");
const prisma = require("../prisma/setup");
const { createDayOffSchema } = require("../validator/dayoff.validator");

class dayOffService {
    async create(req, data) {
        const schema = createDayOffSchema(req)
        const { error, value } = schema.validate(data, { abortEarly: false })

        if (error) {
            const notAllowedErrors = error.details.filter(
                (d) => d.type === "object.unknown"
            );

            if (notAllowedErrors.length > 0) {
                throw {
                    status: 400,
                    message: "Siz notoʻgʻri maʻlumot yubordingiz!",
                };
            }

            throw {
                status: 400,
                message: error.message,
            };
        }

        const dayOff = await prisma.dayOff.create({
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

        return dayOff
    }

    async getAll(req) {
        const dayOffs = await prisma.dayOff.findMany()

        if (!dayOffs || dayOffs.length === 0) {
            throw {
                status: 404,
                message: "Dam olish kunlari mavjud emas!"
            }
        }

        return dayOffs
    }

    async getOne(req, paramsId) {
        const id = checkId(paramsId)

        const dayOff = await prisma.dayOff.findUnique({ where: { id } })

        if (!dayOff) {
            throw {
                status: 404,
                message: "Dam olish kuni mavjud emas!"
            }
        }

        return dayOff
    }

    async delete(req, paramsId) {
        const dayOff = await this.getOne(req, paramsId)

        await prisma.dayOffDate.deleteMany({ where: { dayOffId: dayOff.id } })
        const result = await prisma.dayOff.delete({ where: { id: dayOff.id } })

        return result
    }
}

module.exports = new dayOffService()