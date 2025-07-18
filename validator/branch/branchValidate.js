import Joi from "joi";

export const createBranchSchema = (req) => {
    return Joi.object({
        name: Joi.string().empty().required().messages({
            'string.base': req.__('validation.branch_name_string'),
            'string.empty': req.__('validation.branch_name_empty'),
            'any.required': req.__('validation.branch_name_required')
        })
    })
}

export const updateBranchSchema = (req) => {
    return Joi.object({
        name: Joi.string().empty().required().messages({
            'string.base': req.__('validation.branch_name_string'),
            'string.empty': req.__('validation.branch_name_empty'),
            'any.required': req.__('validation.branch_name_required')
        })
    })
}