const breakService = require("../services/break.service");

class breakController {
    async create(req, res, next) {
        try {
            const data = req.body;
            const breakoff = await breakService.create(req, data);

            return res.status(201).json({
                success: true,
                message: "Tanaffus yaratildi!",
                breakoff,
            });
        } catch (error) {
            next(error);
        }
    }

    async getAll(req, res, next) {
        try {
            const breakOffs = await breakService.getAll(req);

            return res.status(200).json({
                success: true,
                breakOffs,
            });
        } catch (error) {
            next(error);
        }
    }

    async getOne(req, res, next) {
        try {
            const paramsId = req.params.id;
            const breakOff = await breakService.getOne(req, paramsId);

            return res.status(200).json({
                success: true,
                breakOff,
            });
        } catch (error) {
            next(error);
        }
    }

    async update(req, res, next) {
        try {
            const paramsId = req.params.id;
            const data = req.body;
            const breakOff = await breakService.update(req, paramsId, data);

            return res.status(200).json({
                success: true,
                message: "Tannaffus yangilandi!",
                breakOff,
            });
        } catch (error) {
            next(error);
        }
    }

    async delete(req, res, next) {
        try {
            const paramsId = req.params.id;
            const breakOff = await breakService.delete(req, paramsId);

            return res.status(200).json({
                success: true,
                message: "Tanaffus o'chirildi!",
                breakOff,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new breakController()