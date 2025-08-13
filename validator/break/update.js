import Joi from "joi";


export const updateBreakSchema = Joi.object({
    name: Joi.string().empty().messages({
        'string.base': 'Tanaffus nomi matn boʻlishi kerak!',
        'string.empty': 'Tanaffus nomi boʻsh boʻlmasligi kerak!',
    }),
    startTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .messages({
            'string.pattern.base': 'Vaqt HH:MM formatida bo‘lishi kerak',
            'string.empty': 'Vaqt bo‘sh bo‘lishi mumkin emas'
        }),
    endTime: Joi.string()
        .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
        .messages({
            'string.pattern.base': 'Vaqt HH:MM formatida bo‘lishi kerak',
            'string.empty': 'Vaqt bo‘sh bo‘lishi mumkin emas'
        })
})