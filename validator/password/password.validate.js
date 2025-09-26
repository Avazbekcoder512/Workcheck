import Joi from "joi"

export const resetPasswordSchema = (req) => {
    return Joi.object({
        password: Joi.string().min(8).max(15).empty('').trim().required().messages({
            'string.base': req.__('validation.password_string'),
            'string.empty': req.__('validation.password_empty'),
            'string.min': req.__('validation.password_min'),
            'string.max': req.__('validation.password_max'),
            'any.required': req.__('validation.password_required')
        }),
        code: Joi.number().min(6).max(6).trim().required().messages({
            'number.base': "Tasdiqlash kodini raqamda kiriting!",
            'number.empty': "Tasdiqlash kodi bo'sh bo'lmasligi kerak!",
            'number.min': "Tasdiqlash kodi {#limit} ta raqamdan kam bo'lmasligi kerak!",
            'number.max': "Tasdiqlash kodi {#limit} ta raqamdan oshmasligi kerak!",
            'any.required': "Tasdiqlash kodini kiritish shart!"
        }),
    })
}

export const checkPhoneSchema = (req) => {
    return Joi.object({
        phone: Joi.string().trim().empty('').required().messages({
            'string.base': req.__('validation.phone_string'),
            'string.empty': req.__('validation.phone_empty'),
            'any.required': req.__('validation.phone_required')
        }),
    })
}