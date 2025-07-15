import prisma from "../prisma/setup.js"

const profile = async (req, res) => {
    try {
        const id = Number(req.user.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: req.__('error.id')
            });
        }

        const admin = await prisma.admins.findFirst({
            where: { id },
            select: {
                id: true,
                name: true,
                username: true,
                image: true,
                phone: true,
                role: true
            }
        })

        if (!admin) {
            return res.status(404).send({
                success: false,
                error: req.__(error.admin_not_found)
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

export { profile }