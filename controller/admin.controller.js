import { cryptoManeger } from "../helper/crypto.js";
import { AdminCreateSchema } from "../validator/adminValidator/createValidate.js";
import prisma from '../prisma/setup.js'
import { updateAdminSchema } from "../validator/adminValidator/updateValidate.js";
// import { updatePassSchema } from "../validator/authValidator/authValidate.js";
import storage from "../helper/supabase.js";

export const adminCreate = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({
        success: false,
        error: req.__('error.image_required')
      });
    }

    const payload = { ...req.body, image: req.file }
    const schema = AdminCreateSchema(req)
    const { error, value } = schema.validate(payload, {
      abortEarly: false
    });
    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    if (!value) {
      return res.status(400).send({
        success: false,
        error: req.__('error.value')
      })
    }

    const imageUpload = await storage.upload(req.file);

    const { name, username, password, phone, role, branchId } = value;

    const existingAdmin = await prisma.admins.findFirst({
      where: { OR: [{ username }, { phone }] }
    })

    if (existingAdmin) {
      return res.status(400).send({
        success: false,
        error: req.__('error.existing_admin')
      });
    }

    const branch_Id = Number(branchId)

    if (isNaN(branch_Id)) {
      return res.status(400).send({
        success: false,
        error: req.__('error.branchId')
      })
    }

    const branch = await prisma.branch.findUnique({ where: { id: branch_Id } })

    if (!branch) {
      return res.status(404).send({
        success: false,
        error: req.__('error.branch_not_found')
      })
    }

    const passwordHash = await cryptoManeger.pass.hash(password);

    const admin = await prisma.admins.create({
      data: {
        name,
        username,
        password: passwordHash,
        phone,
        role,
        branchId: branch_Id,
        image: imageUpload.url,
        image_path: imageUpload.path
      },
    });

    return res.status(201).send({
      success: true,
      error: false,
      message: req.__('success.admin_create'),
    });
  } catch (error) {
    throw error;
  }
};

export const getAllAdmins = async (req, res) => {
  try {
    const q = req.query.q
    const filters = []

    if (q) {
      filters.push(
        { name: { contains: q, mode: 'insensitive' } },
        { username: { contains: q, mode: 'insensitive' } }
      )
    }
    const admins = await prisma.admins.findMany({
      where: filters.length > 0 ? { OR: filters } : {},
      orderBy: { role: "desc" },
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        role: true,
        image: true,
        branch: true
      }
    });

    if (admins.length == 0) {
      return res.status(404).send({
        success: false,
        error: req.__('error.admins_not_found'),
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

    if (isNaN(id)) {
      return res.status(400).send({
        success: false,
        error: req.__('error.id')
      });
    }

    const admin = await prisma.admins.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        username: true,
        phone: true,
        role: true,
        image: true,
        branch: true
      }
    })

    if (!admin) {
      return res.status(404).send({
        success: false,
        error: req.__('error.admin_not_found')
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

    if (isNaN(id)) {
      return res.status(400).send({
        success: false,
        error: req.__('error.id')
      });
    }

    const admin = await prisma.admins.findUnique({
      where: {
        id
      }
    })

    if (!admin) {
      return res.status(404).send({
        success: false,
        error: req.__('error.admin_not_found')
      })
    }

    const payload = { ...req.body, image: req.file }
    const schema = updateAdminSchema(req)
    const { error, value } = schema.validate(payload, { abortEarly: false })

    if (error) {
      return res.status(400).send({
        success: false,
        error: error.details[0].message,
      });
    }

    if (!value) {
      return res.status(400).send({
        success: false,
        error: req.__('error.value')
      })
    }

    if (value.username && value.username !== admin.username) {
      const existing = await prisma.admins.findFirst({
        where: {
          username: value.username,
          NOT: { id: id }
        }
      });

      if (existing) {
        return res.status(400).send({
          success: false,
          error: req.__('error.existing_admin')
        });
      }
    }

    let newPassword = admin.password;
    if (value.password) {
      newPassword = await cryptoManeger.pass.hash(value.password);
    }

    const branch_Id = Number(value.branchId)

    if (isNaN(branch_Id)) {
      return res.status(400).send({
        success: false,
        error: req.__('error.branchId')
      })
    }

    const branch = await prisma.branch.findUnique({
      where: { id: branch_Id }
    })

    if (!branch) {
      return res.status(404).send({
        success: false,
        error: req.__('error.branch_not_found')
      })
    }

    const updatedAdmin = {
      name: value.name || admin.name,
      username: value.username || admin.username,
      phone: value.phone || admin.phone,
      password: newPassword,
      role: value.role || admin.role,
      branchId: branch_Id || admin.branchId
    }

    if (value.image) {
      if (admin.image_path) {
        await storage.delete(admin.image_path);
      }
      const image = await storage.upload(req.file);
      updatedAdmin.image_path = image.path;
      updatedAdmin.image = image.url;
    }


    await prisma.admins.update({
      where: { id },
      data: updatedAdmin
    })

    return res.status(200).send({
      success: true,
      error: false,
      message: req.__('success.admin_update')
    })
  } catch (error) {
    throw error
  }
}

// export const updatePassword = async (req, res) => {
//   try {
//     const id = Number(req.params.id)

//     if (isNaN(id)) {
//       return res.status(400).send({
//         success: false,
//         error: req.__('error.id')
//       });
//     }

//     const admin = await prisma.admins.findFirst({ where: { id } })

//     if (!admin) {
//       return res.status(404).send({
//         success: false,
//         error: req.__('error.admin_not_found')
//       })
//     }

//     const schema = updatePassSchema(req)
//     const { error, value } = schema.validate(req.body, { abortEarly: false })

//     if (error) {
//       return res.status(400).send({
//         success: false,
//         error: error.details[0].message,
//       });
//     }

//     const passwordHash = await cryptoManeger.pass.hash(value.password)

//     await prisma.admins.update({
//       where: { id },
//       data: { password: passwordHash }
//     })

//     return res.status(200).send({
//       success: true,
//       error: false,
//       message: req.__('success.update_password')
//     })
//   } catch (error) {
//     throw error
//   }
// }

export const deleteAdmin = async (req, res) => {
  try {
    const id = Number(req.params.id)

    if (isNaN(id)) {
      return res.status(400).send({
        success: false,
        error: req.__('error.id')
      });
    }

    const admin = await prisma.admins.findUnique({
      where: { id }
    })

    if (!admin) {
      return res.status(404).send({
        success: false,
        error: req.__('error.admin_not_found')
      })
    }

    if (admin.image_path) {
      await storage.delete(admin.image_path)
    }

    await prisma.admins.delete({
      where: { id }
    })

    return res.status(200).send({
      success: true,
      error: false,
      message: req.__('success.admin_delete')
    })
  } catch (error) {
    throw error
  }
}