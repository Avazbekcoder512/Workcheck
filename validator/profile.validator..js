const Joi = require("joi");

exports.updateProfileSchema = (req) => {
    return Joi.object({
        name: Joi.string().min(3).max(255).messages({
            "string.base": "Ism matn boʻlishi kerak!",
            "string.empty": "Ism boʻsh boʻlmasligi kerak!",
            "string.min":
                "Ism kamida {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Ism maksimal {#limit} ta belgidan iborat boʻlishi kerak!",
        }),
        username: Joi.string().min(3).max(255).trim().messages({
            "string.base": "Foydalanuvchi nomi matn boʻlishi kerak!",
            "string.empty": "Foydalanuvchi nomi boʻsh boʻlmasligi kerak!",
            "string.min":
                "Foydalanuvchi nomi kamida {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Foydalanuvchi nomi maksimal {#limit} ta belgidan iborat boʻlishi kerak!",
        }),
        password: Joi.string()
            .min(8)
            .max(15)
            .trim()
            .optional()
            .allow("", null)
            .messages({
                "string.base": "Parol matn boʻlishi kerak!",
                "string.empty": "Parol boʻsh boʻlmasligi kerak!",
                "string.min":
                    "Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!",
                "string.max":
                    "Parol maksimal {#limit} ta belgidan iborat boʻlishi kerak!",
            }),
        phone: Joi.string().trim().messages({
            "string.base": "Telefon raqam matn boʻlishi kerak!",
            "string.empty": "Telefon raqam boʻsh boʻlmasligi kerak!",
        }),
    });
};
