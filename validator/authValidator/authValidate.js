import Joi from "joi";

export const loginSchema = (req) => {
    return Joi.object({
        username: Joi.string().empty('').min(3).max(255).trim().required().messages({
            'string.base': req.__('validation.username_string'),
            'string.empty': req.__('validation.username_empty'),
            'string.min': req.__('validation.username_min'),
            'string.max': req.__('validation.username_max'),
            'any.required': req.__('validation.username_required')
        }),
        password: Joi.string().empty('').min(8).max(15).trim().required().messages({
            'string.base': req.__('validation.password_string'),
            'string.empty': req.__('validation.password_empty'),
            'string.min': req.__('validation.password_min'),
            'string.max': req.__('validation.password_max'),
            'any.required': req.__('validation.password_required')
        }),
    })
}

// export const updatePassSchema = (req) => {
//     return Joi.object({
//         password: Joi.string().empty('').min(8).max(15).trim().required().messages({
//             'string.base': req.__('validation.password_string'),
//             'string.empty': req.__('validation.password_empty'),
//             'string.min': req.__('validation.password_min'),
//             'string.max': req.__('validation.password_max'),
//             'any.required': req.__('validation.password_required')
//         })
//     })
// }