const Joi = require("joi");

exports.loginSchema = (req) => {
    return Joi.object({
        username: Joi.string().min(3).max(255).trim().required().messages({
            "string.base": "Foydalanuvchi nomi matn boʻlishi kerak!",
            "string.empty": "Foydalanuvchi nomi boʻsh boʻlishi mumkin emas!",
            "string.min":
                "Foydalanuvchi nomi kamida {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Foydalanuvchi nomi maksimal {#limit} ta belgidan iborat boʻlishi kerak!",
            "any.required": "Foydalanuvchi nomi kiritilishi shart!",
        }),
        password: Joi.string().min(8).max(15).trim().required().messages({
            "string.base": "Parol matn boʻlishi kerak!",
            "string.empty": "Parol boʻsh boʻlishi mumkin emas!",
            "string.min":
                "Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Parol maksimal {#limit} ta belgidan iborat boʻlishi kerak!",
            "any.required": "Parol kiritilishi shart!",
        }),
    });
};
