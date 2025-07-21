import Joi from "joi";


const workerCreateSchema = (req) => {
    return Joi.object({
        fullname: Joi.string().empty().min(10).max(400).required().messages({
            'string.base': req.__('worker.fullname_string'),
            'string.empty': req.__('worker.fullname_empty'),
            'string.min': req.__('worker.fullname_min'),
            'string.max': req.__('worker.fullname_max'),
            'any.required': req.__('worker.fullname_required')
        }),
        position: Joi.string().empty().max(200).required().messages({
            'string.base': req.__('worker.position_string'),
            'string.empty': req.__('worker.position_empty'),
            'string.max': req.__('worker.position_max'),
            'any.required': req.__('worker.position_required')
        }),
        salary: Joi.number().integer().empty().required().messages({
            'number.base': req.__('worker.salary_number'),
            'number.empty': req.__('worker.salary_empty'),
            'any.requied': req.__('worker.salary_requied')
        }),
        phone: Joi.string().empty().required({
            'string.base': req.__('worker.phone_string'),
            'string.empty': req.__('worker.phone_empty'),
            'any.required': req.__('worker.phone_required')
        }),
        age: Joi.number().integer().empty().required().messages({
            'number.base': req.__('worker.age_number'),
            'number.empty': req.__('worker.age_empty'),
            'any.required': req.__('worker.age_required')
        }),
        gender: Joi.string().empty().valid('MALE', 'FEMALE').required().messages({
            'string.base': req.__('worker.gender_string'),
            'string.empty': req.__('worker.gender_empty'),
            'any.only': req.__('worker.gender_only'),
            'any.required': req.__('worker.gender_required')
        }),
        passport: Joi.string().empty().min(9).max(9).required().messages({
            'string.base': req.__('worker.passport_string'),
            'string.empty': req.__('worker.passport_empty'),
            'string.min': req.__('worker.passport_min'),
            'string.max': req.__('worker.passport_max'),
            'any.required': req.__('worker.passport_required')
        }),
        is_active: Joi.boolean().required().messages({
            'any.required': req.__('worker.is_active_required'),
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
    })
}

export default workerCreateSchema