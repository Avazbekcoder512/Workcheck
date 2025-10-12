const { checkId } = require("../helper/checkId");
const prisma = require("../prisma/setup");
const {
  createShiftSchema,
  updateShiftSchema,
} = require("../validator/shift.validator");

class shiftService {
  async create(req, data) {
    const schema = createShiftSchema(req);
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

    const shift = await prisma.shift.create({
      data: { ...value },
    });

    return shift;
  }

  async getAll(req) {
    const shifts = await prisma.shift.findMany();

    if (!shifts || shifts.length === 0) {
      throw {
        status: 404,
        message: "Navbatchiliklar mavjud emas!",
      };
    }

    return shifts;
  }

  async getOne(req, paramsId) {
    const id = await checkId(paramsId);

    const shift = await prisma.shift.findUnique({ where: { id } });

    if (!shift) {
      throw {
        status: 404,
        message: "Navbatchilik mavjud emas!",
      };
    }

    return shift;
  }

  async update(req, paramsId, data) {
    const shift = await this.getOne(req, paramsId);

    const schema = updateShiftSchema(req);
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

    const result = await prisma.shift.update({
      where: { id: shift.id },
      data: { ...value },
    });

    return result;
  }

  async delete(req, paramsId) {
    const shift = await this.getOne(req, paramsId);

    const result = await prisma.shift.delete({ where: { id: shift.id } });

    return result;
  }
}

module.exports = new shiftService()