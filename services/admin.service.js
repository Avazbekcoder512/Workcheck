const { checkId } = require("../helper/checkId");
const { cryptoManeger } = require("../helper/crypto");
const { storage } = require("../helper/supabase");
const prisma = require("../prisma/setup");
const {
    adminCreateSchema,
    adminUpdateSchema,
} = require("../validator/admin.validator");

class adminService {
    async create(req, data, file) {
        if (!file) {
            throw {
                status: 400,
                message: "Fayl yubormadingiz!",
            };
        }

        const schema = adminCreateSchema(req);
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

        const existingAdmin = await prisma.admins.findFirst({
            where: {
                OR: [{ username: value.username }, { phone: value.phone }],
            },
        });

        if (existingAdmin) {
            throw {
                status: 400,
                message:
                    "Bunday username va parolga ega admin allaqachon mavjud!",
            };
        }

        const branchId = checkId(value.branchId);

        const branch = await prisma.branch.findUnique({
            where: { id: branchId },
        });

        if (!branch) {
            throw {
                status: 404,
                message: "Bunday filial mavjud emas!",
            };
        }

        const imageUpload = await storage.upload(file);
        const passwordHash = await cryptoManeger.pass.hash(value.password);

        const admin = await prisma.admins.create({
            data: {
                name: value.name,
                username: value.username,
                password: passwordHash,
                phone: value.phone,
                role: value.role,
                branchId: branch.id,
                image: imageUpload.url,
                image_path: imageUpload.path,
            },
        });

        return admin;
    }

    async getAll(req) {
        const admins = await prisma.admins.findMany({
            include: { branch: true },
            omit: { password: true },
        });

        if (admins.length === 0 || !admins) {
            throw {
                status: 404,
                message: "Adminlar mavjud emas!",
            };
        }

        return admins;
    }

    async getOne(req, paramsId) {
        const id = checkId(paramsId);

        const admin = await prisma.admins.findUnique({
            where: { id },
            include: { branch: true },
            omit: { password: true },
        });

        if (!admin) {
            throw {
                status: 404,
                message: "Admin mavjud emas!",
            };
        }

        return admin;
    }

    async update(req, paramsId, data, file) {
        const admin = await this.getOne(req, paramsId);

        const schema = adminUpdateSchema(req);
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

        if (value.branchId) {
            const branchId = checkId(value.branchId);
            console.log(typeof branchId);

            const branch = await prisma.branch.findUnique({
                where: { id: branchId },
            });

            if (!branch) {
                throw {
                    status: 404,
                    message: "Bunday filial mavjud emas!",
                };
            }
        }

        if (value.username || value.phone) {
            const conflict = await prisma.admins.findFirst({
                where: {
                    AND: [
                        {
                            OR: [
                                value.username
                                    ? { username: value.username }
                                    : undefined,
                                value.phone
                                    ? { phone: value.phone }
                                    : undefined,
                            ].filter(Boolean),
                        },
                        { id: { not: admin.id } },
                    ],
                },
            });

            if (conflict) {
                throw {
                    status: 400,
                    message:
                        "Berilgan username yoki telefon boshqa adminga tegishli!",
                };
            }
        }

        const body = {
            name: value.name,
            username: value.username,
            phone: value.phone,
            role: value.role,
            branchId: Number(value.branchId),
        };

        if (file) {
            if (admin.image_path) {
                await storage.delete(admin.image_path);
            }
            const imageUpload = await storage.upload(file);
            (body.image = imageUpload.url),
                (body.image_path = imageUpload.path);
        }

        const updatedAdmin = await prisma.admins.update({
            where: { id: admin.id },
            data: {
                ...body,
            },
        });

        return updatedAdmin;
    }

    async delete(req, paramsId) {
        const admin = await this.getOne(req, paramsId);

        // if (req.user && req.user.id === admin.id) {
        //     throw { status: 400, message: "O'zingizni o'chira olmaysiz!" };
        // }

        if (admin.image && admin.image_path) {
            await storage.delete(admin.image_path);
        }

        const result = await prisma.admins.delete({
            where: { id: admin.id },
        });

        return result;
    }
}

module.exports = new adminService();