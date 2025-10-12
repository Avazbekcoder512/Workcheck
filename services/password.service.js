const { cryptoManeger } = require("../helper/crypto");
const prisma = require("../prisma/setup");
const {
  checkPhoneSchema,
  verifyCodeSchema,
  resetPasswordSchema,
} = require("../validator/password.validate");

class passwordService {
  async findAdmin(req, phone) {
    const admin = await prisma.admins.findUnique({
      where: { phone },
    });

    if (!admin) {
      throw {
        status: 404,
        message: "Bunday telefon raqamga ega admin topilmadi!",
      };
    }

    return admin;
  }

  async checkPhone(req, data) {
    const schema = checkPhoneSchema(req);
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

    const admin = await this.findAdmin(req, value.phone);

    const generateRandomCode = () =>
      Math.floor(100000 + Math.random() * 900000);

    const resetCode = generateRandomCode();

    // const Token = await getNewToken()
    // const Phone = user.phoneNumber
    // const Message = `Limon.uz saytidagi telefon raqamingizni tasdiqlash kodi ${resetCode}`

    // axios.post('https://notify.eskiz.uz/api/message/sms/send', {
    //     mobile_phone: Phone,
    //     message: Message,
    //     from: process.env.Eskiz_From
    // }, {
    //     headers: {
    //         Authorization: `Bearer ${Token}`
    //     }
    // })
    //     .then(res => console.log(res.data))
    //     .catch(err => console.error('SMS yuborishda xatolik:', err.response?.data || err))

    const result = await prisma.admins.update({
      where: { id: admin.id },
      data: {
        verifyCode: resetCode,
      },
    });

    return result;
  }

  async verifyCode(req, data) {
    const schema = verifyCodeSchema(req);
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

    const admin = await this.findAdmin(req, value.phone);

    if (admin.verifyCode != value.code) {
      throw {
        status: 400,
        message: "Tasdiqlash kodi noto'g'ri!",
      };
    }

    return admin;
  }

  async resetPassword(req, data) {
    const schema = resetPasswordSchema(req);
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

    const admin = await this.findAdmin(req, value.phone);

    const newPass = await cryptoManeger.pass.hash(value.password);

    const result = await prisma.admins.update({
      where: { id: admin.id },
      data: { password: newPass },
    });

    return result;
  }
}

module.exports = new passwordService()