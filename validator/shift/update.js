import Joi from "joi";


export const updateShiftSchema = Joi.object({
    name: Joi.string().empty().messages({
        'string.base': 'Navbatchilik nomi matn boʻlishi kerak!',
        'string.empty': 'Navbatchilik nomi boʻsh boʻlmasligi kerak!',
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