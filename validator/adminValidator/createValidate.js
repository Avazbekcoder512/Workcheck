import Joi from "joi";

export const AdminCreateSchema = (req) => {
    return Joi.object({
        name: Joi.string().min(3).max(255).empty('').required().messages({
            'string.base': req.__('validation.name_string'),
            'string.empty': req.__('validation.name_empty'),
            'string.min': req.__('validation.name_min'),
            'string.max': req.__('validation.name_max'),
            'any.required': req.__('validation.required')
        }),
        username: Joi.string().min(3).max(255).empty('').trim().required().messages({
            'string.base': req.__('validation.username_string'),
            'string.empty': req.__('validation.username_empty'),
            'string.min': req.__('validation.username_min'),
            'string.max': req.__('validation.username_max'),
            'any.required': req.__('validation.username_required')
        }),
        password: Joi.string().min(8).max(15).empty('').trim().required().messages({
            'string.base': req.__('validation.password_string'),
            'string.empty': req.__('validation.password_empty'),
            'string.min': req.__('validation.password_min'),
            'string.max': req.__('validation.password_max'),
            'any.required': req.__('validation.password_required')
        }),
        phone: Joi.string().trim().empty('').required().messages({
            'string.base': req.__('validation.phone_string'),
            'string.empty': req.__('validation.phone_empty'),
            'any.required': req.__('validation.phone_required')
        }),
        role: Joi.string().empty('').valid("ADMIN", "SUPERADMIN").required().messages({
            'string.base': req.__('validation.role_string'),
            'string.empty': req.__('validation.role_empty'),
            'any.only': req.__('validation.role_only'),
            'any.required': req.__('validation.role_required')
        })
    })
}