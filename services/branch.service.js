const { checkId } = require("../helper/checkId");
const prisma = require("../prisma/setup");
const {
    createBranchSchema,
    updateBranchSchema,
} = require("../validator/branch.validator");

class branchService {
    async create(req, data) {
        const schema = createBranchSchema(req);
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

        const branch = await prisma.branch.create({
            data: {
                ...value,
            },
        });

        return branch;
    }

    async getAll(req) {
        const branches = await prisma.branch.findMany({
            include: { admins: true, workers: true },
        });

        if (!branches || branches.length === 0) {
            throw {
                status: 404,
                message: "Filiallar mavjud emas!",
            };
        }

        return branches;
    }

    async getOne(req, paramsId) {
        const id = checkId(paramsId);

        const branch = await prisma.branch.findUnique({
            where: { id },
            include: { admins: true, workers: true },
        });

        if (!branch) {
            throw {
                error: 404,
                message: "Filial mavjud emas!",
            };
        }

        return branch;
    }

    async update(req, paramsId, data) {
        const branch = await this.getOne(req, paramsId);
        const schema = updateBranchSchema(req);
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

        const result = await prisma.branch.update({
            where: { id: branch.id },
            data: { ...value },
        });

        return result;
    }

    async delete(req, paramsId) {
        const branch = await this.getOne(req, paramsId);

        const result = await prisma.branch.delete({ where: { id: branch.id } });

        return result;
    }
}

module.exports = new branchService();
