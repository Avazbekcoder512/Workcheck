import Joi from "joi";

const updateWorkerSchema = (req) => {
    return Joi.object({
        fullname: Joi.string().min(10).max(400).messages({
            'string.base': req.__('worker.fullname_string'),
            'string.min': req.__('worker.fullname_min'),
            'string.max': req.__('worker.fullname_max')
        }),
        position: Joi.string().max(200).messages({
            'string.base': req.__('worker.position_string'),
            'string.max': req.__('worker.position_max')
        }),
        salary: Joi.number().integer().messages({
            'number.base': req.__('worker.salary_number')
        }),
        phone: Joi.string().messages({
            'string.base': req.__('worker.phone_string')
        }),
        age: Joi.number().integer().messages({
            'number.base': req.__('worker.age_number')
        }),
        gender: Joi.string().valid('MALE', 'FEMALE').messages({
            'string.base': req.__('worker.gender_string'),
            'any.only': req.__('worker.gender_only')
        }),
        passport: Joi.string().min(9).max(9).messages({
            'string.base': req.__('worker.passport_string'),
            'string.min': req.__('worker.passport_min'),
            'string.max': req.__('worker.passport_max')
        }),
        is_active: Joi.boolean().messages({
            'boolean.base': req.__('worker.is_active_base')
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
    })
}

export default updateWorkerSchema