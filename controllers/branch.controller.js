const branchService = require("../services/branch.service.js");

class branchController {
    async create(req, res, next) {
        try {
            const data = req.body;
            const branch = await branchService.create(req, data);

            return res.status(201).json({
                success: true,
                message: "Filial yaratildi!",
                branch,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const branches = await branchService.getAll(req);

            return res.status(200).json({
                success: true,
                branches,
            });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const paramsId = req.params.id;
            const branch = await branchService.getOne(req, paramsId);

            return res.status(200).json({
                success: true,
                branch,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const paramsId = req.params.id;
            const data = req.body;
            const branch = await branchService.update(req, paramsId, data);

            return res.status(200).json({
                success: true,
                message: "Filial yangilandi!",
                branch,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const paramsId = req.params.id;
            const branch = await branchService.delete(req, paramsId);

            return res.status(200).json({
                success: true,
                message: "Filial o'chirildi!",
                branch,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new branchController()
