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
        password: Joi.string()
            .min(8).max(15).trim()
            .optional()
            .allow('', null)
            .messages({
                'string.base': req.__('validation.password_string'),
                'string.min': req.__('validation.password_min'),
                'string.max': req.__('validation.password_max'),
            }),
        phone: Joi.string().trim().messages({
            'string.base': req.__('validation.phone_string'),
        }),
        role: Joi.string().valid("ADMIN", "SUPERADMIN").messages({
            'string.base': req.__('validation.role_string'),
            'any.only': req.__('validation.role_only'),
        }),
        branchId: Joi.string().empty('').messages({
            'string.base': req.__('validation.branchId_string'),
            'string.empty': req.__('validation.branchId_empty')
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
            .optional()
    });
};
