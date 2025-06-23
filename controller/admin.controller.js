import { cryptoManeger } from "../helper/crypto.js";
import { AdminCreateSchema } from "../validator/adminValidator/createValidate.js";
import prisma from '../prisma/setup.js'
import { updateAdminSchema } from "../validator/adminValidator/updateValidate.js";
import { updatePassSchema } from "../validator/authValidator/authValidate.js";

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

    return res.status(201).send({
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
    const admins = await prisma.admins.findMany({
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        role: true,
        image: true
      }
    });

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

export const getOneAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const admin = await prisma.admins.findFirst({ where: { id } })

    if (!admin) {
      return res.status(404).send({
        success: false,
        error: "Admin topilmadi!"
      })
    }

    return res.status(200).send({
      success: true,
      error: false,
      admin
    })
  } catch (error) {
    throw error
  }
}

export const updateAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const admin = await prisma.admins.findFirst({
      where: {
        id
      }
    })

    if (!admin) {
      return res.status(404).send({
        success: false,
        error: "Admin topilmadi!"
      })
    }

    const { error, value } = updateAdminSchema.validate(req.body, { abortEarly: false })

    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    const updatedAdmin = await prisma.admins.update({
      where: {
        id
      },
      data: value
    })

    return res.status(201).send({
      success: true,
      error: false,
      message: 'Admin ma\'lumotlari muvaffaqiyatli yangilandi!'
    })
  } catch (error) {
    throw error
  }
}

export const updatePassword = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const admin = await prisma.admins.findFirst({ where: { id } })

    if (!admin) {
      return res.status(404).send({
        success: false,
        error: "Admin topilmadi!"
      })
    }

    const { error, value } = updatePassSchema.validate(req.body, { abortEarly: false })

    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    const passwordHash = await cryptoManeger.pass.hash(value.password)

    await prisma.admins.update({
      where: { id },
      data: { password: passwordHash }
    })

    return res.status(201).send({
      success: true,
      error: false,
      message: "Parol muvaffaqiyatli yangilandi!"
    })
  } catch (error) {
    throw error
  }
}

export const deleteAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id)

    const admin = await prisma.admins.findFirst({
      where: id
    })

    if (!admin) {
      return res.status(404).send({
        success: false,
        error: "Admin topilmadi!"
      })
    }

    await prisma.admins.delete({
      where: id
    })

    return res.status(200).send({
      success: true,
      error: false,
      message: "Admin muvaffaqiyatli o'chirildi!"
    })
  } catch (error) {
    throw error
  }
}