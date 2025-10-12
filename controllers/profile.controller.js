const profileService = require("../services/profile.service");

class profileController {
  async profile(req, res, next) {
    try {
      const profile = await profileService.profile(req);

      return res.status(200).json({
        success: true,
        profile,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const data = req.body;
      const file = req.file;
      const profile = await profileService.update(req, data, file);

      return res.status(200).json({
        success: true,
        message: "Ma'lumotlaringiz yangilandi!",
        profile,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new profileController()