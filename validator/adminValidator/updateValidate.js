import Joi from "joi";

export const updateAdminSchema = (req) => {
    return Joi.object({
        name: Joi.string().min(3).max(255).messages({
            'string.base': req.__('validation.name_string'),
            'string.min': req.__('validation.name_min'),
            'string.max': req.__('validation.name_max'),
        }),
        username: Joi.string().min(3).max(255).trim().messages({
            'string.base': req.__('validation.username_string'),
            'string.min': req.__('validation.username_min'),
            'string.max': req.__('validation.username_max'),
        }),
        password: Joi.string().min(8).max(15).trim().messages({
            'string.base': req.__('validation.password_string'),
            'string.min': req.__('validation.password_min'),
            'string.max': req.__('validation.password_max'),
        }),
        phone: Joi.string().trim().messages({
            'string.base': 'validation.phone_string',
        }),
        role: Joi.string().valid("ADMIN", "SUPERADMIN").messages({
            'string.base': req.__('validation.role_string'),
            'any.only': req.__('validation.role_only')
        })
    })
}