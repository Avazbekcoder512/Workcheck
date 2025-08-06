import { cryptoManeger } from "../helper/crypto.js";
import prisma from "../prisma/setup.js"
import { updateProfileSchema } from "../validator/profileValidate/updateSchema.js";

const profile = async (req, res) => {
    try {
        const id = Number(req.user.id)

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
                image: true,
                phone: true,
                role: true,
                branch: true
            }
        })

        if (!admin) {
            return res.status(404).send({
                success: false,
                error: req.__('error.profile_not_found')
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

const updateProfile = async (req, res) => {
    try {
        const id = Number(req.user.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: req.__('error.id')
            });
        }

        const admin = await prisma.admins.findUnique({ where: { id } })

        if (!admin) {
            return res.status(404).send({
                success: false,
                error: req.__('error.profile_not_found')
            })
        }

        const payload = { ...req.body, image: req.file }
        const schema = updateProfileSchema(req)
        const { error, value } = schema.validate(payload, { abortEarly: false })

        if (error) {
            return req.status(400).send({
                success: false,
                error: error.details[0].message
            })
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: req.__('error.value')
            })
        }

        let newPassword = admin.password;
        if (value.password) {
            newPassword = await cryptoManeger.pass.hash(value.password)
        }

        const updatedProfile = {
            name: value.name || admin.name,
            username: value.username || admin.username,
            phone: value.phone || admin.phone,
            password: newPassword,
            role: value.role || admin.role
        }

        if (value.image) {
            if (admin.image_path) {
                await storage.delete(admin.image_path);
            }
            const image = await storage.upload(req.file);
            updatedProfile.image_path = image.path;
            updatedProfile.image = image.url;
        }

        await prisma.admins.update({
            where: { id },
            data: updatedProfile
        })

        return res.status(200).send({
            success: true,
            error: false,
            message: req.__('success.profile')
        })

    } catch (error) {
        throw error
    }
}

export { profile, updateProfile }