const Joi = require("joi");

exports.verifyCodeSchema = (req) => {
    return Joi.object({
        phone: Joi.string().trim().required().messages({
            "string.base": "Telefon raqami matn boʻlishi kerak!",
            "string.empty": "Telefon raqami boʻsh boʻlmasligi kerak!",
            "any.required": "Telefon raqamini kiritish shart!",
        }),
        code: Joi.string().min(6).max(6).trim().required().messages({
            "string.base": "Tasdiqlash kodini raqamda kiriting!",
            "string.empty": "Tasdiqlash kodi boʻsh boʻlmasligi kerak!",
            "string.min":
                "Tasdiqlash kodi {#limit} ta raqamdan kam bo‘lmasligi kerak!",
            "string.max":
                "Tasdiqlash kodi {#limit} ta raqamdan oshmasligi kerak!",
            "any.required": "Tasdiqlash kodini kiritish shart!",
        }),
    });
};

exports.resetPasswordSchema = (req) => {
    return Joi.object({
        password: Joi.string().min(8).max(15).trim().required().messages({
            "string.base": "Parol matn boʻlishi kerak!",
            "string.empty": "Parol boʻsh boʻlmasligi kerak!",
            "string.min":
                "Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Parol maksimal {#limit} ta belgidan iborat boʻlishi kerak!",
            "any.required": "Parol kiritish shart!",
        }),
        phone: Joi.string().trim().required().messages({
            "string.base": "Telefon raqami matn boʻlishi kerak!",
            "string.empty": "Telefon raqami boʻsh boʻlmasligi kerak!",
            "any.required": "Telefon raqamini kiritish shart!",
        }),
    });
};

exports.checkPhoneSchema = (req) => {
    return Joi.object({
        phone: Joi.string().trim().required().messages({
            "string.base": "Telefon raqami matn boʻlishi kerak!",
            "string.empty": "Telefon raqami boʻsh boʻlmasligi kerak!",
            "any.required": "Telefon raqamini kiritish shart!",
        }),
    });
};