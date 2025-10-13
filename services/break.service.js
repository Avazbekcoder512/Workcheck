const { checkId } = require("../helper/checkId");
const prisma = require("../prisma/setup");
const {
    createBreakSchema,
    updateBreakSchema,
} = require("../validator/break.validator");

class breakService {
    async create(req, data) {
        const schema = createBreakSchema(req);
        const { error, value } = schema.validate(data, { abortEarly: false });

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

        const existBreak = await prisma.break.findFirst({
            where: { name: value.name },
        });

        if (existBreak) {
            throw {
                status: 400,
                message: "Bunday tanaffus kuni yaratilgan!",
            };
        }

        const breakOff = await prisma.break.create({
            data: {
                ...value,
            },
        });

        return breakOff;
    }

    async getAll(req) {
        const breakOffs = await prisma.break.findMany();

        if (!breakOffs || breakOffs.length === 0) {
            throw {
                status: 404,
                message: "Tanaffuslar mavjud emas!",
            };
        }

        return breakOffs;
    }

    async getOne(req, paramsId) {
        const id = checkId(paramsId);

        const breakOff = await prisma.break.findUnique({ where: { id } });

        if (!breakOff) {
            throw {
                status: 404,
                message: "Tanaffus mavjud emas!",
            };
        }

        return breakOff;
    }

    async update(req, paramsId, data) {
        const breakOff = await this.getOne(req, paramsId);

        const schema = updateBreakSchema(req);
        const { error, value } = schema.validate(data, { abortEarly: false });

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

        const result = await prisma.break.update({
            where: { id: breakOff.id },
            data: { ...value },
        });

        return result;
    }

    async delete(req, paramsId) {
        const breakOff = await this.getOne(req, paramsId);

        const result = await prisma.break.delete({
            where: { id: breakOff.id },
        });

        return result;
    }
}

module.exports = new breakService()