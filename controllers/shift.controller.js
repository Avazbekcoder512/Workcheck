const shiftService = require("../services/shift.service");

class shiftController {
  async create(req, res, next) {
    try {
      const data = req.body;

      const shift = await shiftService.create(req, data);

      return res.status(201).json({
        success: true,
        message: "Navbatchilik yaratildi!",
        shift,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const shifts = await shiftService.getAll(req);

      return res.status(200).json({
        success: true,
        shifts,
      });
    } catch (error) {
      next(error);
    }
  }

  async getOne(req, res, next) {
    try {
      const paramsId = req.params.id;

      const shift = await shiftService.getOne(req, paramsId);

      return res.status(200).json({
        success: true,
        shift,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const paramsId = req.params.id;
      const data = req.body;

      const shift = await shiftService.update(req, paramsId, data);

      return res.status(200).json({
        success: true,
        message: "Navbatchilik yangilandi!",
        shift,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const paramsId = req.params.id;

      const shift = await shiftService.delete(req, paramsId);

      return res.status(200).json({
        success: true,
        message: "Navbatchilik o'chirildi!",
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new shiftController()