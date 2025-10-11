const adminService = require("../services/admin.service.js");

class adminController {
    async create(req, res, next) {
        try {
            const data = req.body;
            const file = req.file;
            const admin = await adminService.create(req, data, file);

            return res.status(201).json({
                success: true,
                message: "Admin muvaffaqiyatli yaratildi!",
                admin,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const admins = await adminService.getAll(req);

            return res.status(200).json({
                success: true,
                admins,
            });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const paramsId = req.params.id;
            const admin = await adminService.getOne(req, paramsId);

            return res.status(200).json({
                success: true,
                admin,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const paramsId = req.params.id;
            const data = req.body;
            const file = req.file;

            const updatedAdmin = await adminService.update(
                req,
                paramsId,
                data,
                file
            );

            return res.status(200).json({
                success: true,
                message: "Admin ma'lumotlari muvaffaqiyatli yaratildi!",
                updatedAdmin,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const paramsId = req.params.id;

            const deletedAdmin = await adminService.delete(req, paramsId);

            return res.status(200).json({
                success: true,
                message: "Admin muvaffaqiyatli o'chirildi!",
                deletedAdmin,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new adminController();
