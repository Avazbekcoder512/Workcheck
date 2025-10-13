const { checkId } = require("../helper/checkId");
const { cryptoManeger } = require("../helper/crypto");
const { storage } = require("../helper/supabase");
const prisma = require("../prisma/setup");
const { updateProfileSchema } = require("../validator/profile.validator.");

class profileService {
  async profile(req) {
    const id = checkId(req.user.id);

    const admin = await prisma.admins.findUnique({
      where: { id },
      omit: { password: true },
    });

    if (!admin) {
      throw {
        status: 404,
        message: "Ma'lumotlar mavjud emas!",
      };
    }

    return admin;
  }

  async update(req, data, file) {
    const admin = await this.profile(req);
    const schema = updateProfileSchema(req);
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

    let newPass = admin.password;

    if (value.password) {
      newPass = await cryptoManeger.pass.hash(value.password);
    }

    const updatedProfile = {
      name: value.name,
      username: value.username,
      phone: value.phone,
      password: newPass,
    };

    if (file) {
      if (admin.image_path && admin.image) {
        await storage.delete(admin.image_path);
      }
      const image = await storage.upload(req.file);
      (updatedProfile.image_path = image.path),
        (updatedProfile.image = image.url);
    }

    const result = await prisma.admins.update({
      where: { id: admin.id },
      data: { ...updatedProfile },
    });

    return result;
  }
}

module.exports = new  profileService()