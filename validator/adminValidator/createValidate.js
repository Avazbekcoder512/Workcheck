import Joi from "joi";

export const AdminCreateSchema = (req) => {
    return Joi.object({
        name: Joi.string().min(3).max(255).empty('').required().messages({
            'string.base': req.__('validation.name_string'),
            'string.empty': req.__('validation.name_empty'),
            'string.min': req.__('validation.name_min'),
            'string.max': req.__('validation.name_max'),
            'any.required': req.__('validation.name_required')
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
        branchId: Joi.string().empty('').required().messages({
            'string.base': req.__('validation.branchId_string'),
            'string.empty': req.__('validation.branchId_empty'),
            'any.required': req.__('validation.branchId_required')
        }),
        role: Joi.string().empty('').valid("ADMIN", "SUPERADMIN").required().messages({
            'string.base': req.__('validation.role_string'),
            'string.empty': req.__('validation.role_empty'),
            'any.only': req.__('validation.role_only'),
            'any.required': req.__('validation.role_required')
        }),
        image: Joi.object({
            originalname: Joi.string()
                .pattern(/\.(jpg|jpeg|png|svg|avf|webp)$/i)
                .required()
                .messages({
                    'string.pattern.base': "Rasm nomi noto'g'ri formatda!",
                    'any.required': "Rasm nomi talab qilinadi!"
                }),
            mimetype: Joi.string()
                .valid("image/jpeg", "image/jpg", "image/png", "image/svg", "image/avf", "image/webp")
                .required()
                .messages({
                    'any.required': "Rasm formati talab qilinadi!"
                }),
            size: Joi.number()
                .max(5 * 1024 * 1024)
                .required()
                .messages({
                    'number.max': "Rasm hajmi 5 mb dan oshmasligi kerak!"
                }),
            fieldname: Joi.string()
                .valid('image')
                .required()
                .messages({
                    'any.required': "Rasm yuklanmadi!"
                }),
            encoding: Joi.string().optional(),
            filename: Joi.string().optional(),
            buffer: Joi.any()
                .required()
                .messages({
                    'any.required': "Rasm yuklanmadi!"
                }),
            path: Joi.string().optional()
        })
    })
}