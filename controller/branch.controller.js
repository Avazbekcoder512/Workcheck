import prisma from "../prisma/setup.js"
import { createBranchSchema, updateBranchSchema } from "../validator/branch/branchValidate.js"

const createBranch = async (req, res) => {
    try {
        const schema = createBranchSchema(req)
        const { error, value } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).send({
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

        await prisma.branch.create({
            data: {
                name: value.name
            }
        })

        return res.status(201).send({
            success: true,
            error: false,
            message: req.__('success.branch')
        })
    } catch (error) {
        throw error
    }
}

const getAllBranches = async (req, res) => {
    try {
        const branches = await prisma.branch.findMany({
            orderBy: {
                id: 'asc'
            }
        })

        if (branches.length == 0) {
            return res.status(404).send({
                success: false,
                error: req.__('error.branches_not_found')
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            branches
        })
    } catch (error) {
        throw error
    }
}

const getOneBranch = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: req.__('error.id')
            })
        }

        const branch = await prisma.branch.findUnique({ where: { id }, include: { admins: true } })

        if (!branch) {
            return res.status(404).send({
                success: false,
                error: req.__('error.branch_not_found')
            })
        }

        return res.status(200).send({
            success: true,
            error: false,
            branch
        })
    } catch (error) {
        throw error
    }
}

const updateBranch = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: req.__('error.id')
            })
        }

        const branch = await prisma.branch.findUnique({ where: { id } })

        if (!branch) {
            return res.status(404).send({
                success: false,
                error: req.__('error.branch_not_found')
            })
        }

        const schema = updateBranchSchema(req)
        const { error, value } = schema.validate(req.body, { abortEarly: false })
        if (error) {
            return res.status(400).send({
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

        const updatedBranch = {
            name: value.name || branch.name
        }

        await prisma.branch.update({
            where: { id },
            data: updatedBranch
        })

        return res.status(200).send({
            success: true,
            error: false,
            message: req.__('success.update_branch')
        })
    } catch (error) {
        throw error
    }
}

const deleteBranch = async (req, res) => {
    try {
        const id = Number(req.params.id)

        if (isNaN(id)) {
            return res.status(400).send({
                success: false,
                error: req.__('error.id')
            })
        }

        const branch = await prisma.branch.findUnique({ where: { id } })

        if (!branch) {
            return res.status(404).send({
                success: false,
                error: req.__('error.branch_not_found')
            })
        }

        await prisma.branch.delete({ where: { id } })

        return res.status(200).send({
            success: true,
            error: false,
            message: req.__('succes.delete_branch')
        })
    } catch (error) {
        throw error
    }
}

export { createBranch, getAllBranches, getOneBranch, updateBranch, deleteBranch }