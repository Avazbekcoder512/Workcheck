import { cryptoManeger } from "../helper/crypto.js";
import { AdminCreateSchema } from "../validator/adminValidator/createValidate.js";
import prisma from '../prisma/setup.js'

export const adminCreate = async (req, res) => {
  try {
    const { error, value } = AdminCreateSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    const { name, username, password, phone, role } = value;

    const existingAdmin = await prisma.admins.findFirst({
      where: { username, phone },
    });

    if (existingAdmin) {
      return res.status(400).send({
        success: false,
        error: "Bunday username yoki telefon raqamga ega admin alaqachon yaratilgan!",
      });
    }

    const passwordHash = await cryptoManeger.pass.hash(password);

    const admin = await prisma.admins.create({
      data: { name, username, password: passwordHash, phone, role },
    });

    return res.status(200).send({
      success: true,
      error: false,
      message: "Admin muvaffaqiyatli yaratildi!",
    });
  } catch (error) {
    throw error;
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const admins = await prisma.admins.findMany();

    if (admins.length == 0) {
      return res.status(404).send({
        success: false,
        error: "Adminlar topilmadi!",
      });
    }

    return res.status(200).send({
      success: true,
      error: false,
      admins,
    });
  } catch (error) {
    throw error;
  }
};
