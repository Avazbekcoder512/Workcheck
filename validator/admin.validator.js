const Joi = require("joi");

exports.adminCreateSchema = (req) => {
    return Joi.object({
        name: Joi.string().min(3).max(255).required().messages({
            "string.base": "Ism matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Ism bo'sh bo'lishi mumkin emas!",
            "string.min":
                "Ism kamida {#limit} ta belgidan iborat bo'lishi kerak!",
            "string.max":
                "Ism ko'pi bilan {#limit} ta belgidan iborat bo'lishi kerak!",
            "any.required": "Ism kiritish majburiy!",
        }),
        username: Joi.string().min(3).max(20).trim().required().messages({
            "string.base":
                "Foydalanuvchi nomi matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Foydalanuvchi nomi bo'sh bo'lishi mumkin emas!",
            "string.min":
                "Foydalanuvchi nomi kamida {#limit} ta belgidan iborat bo'lishi kerak!",
            "string.max":
                "Foydalanuvchi nomi ko'pi bilan {#limit} ta belgidan iborat bo'lishi kerak!",
            "any.required": "Foydalanuvchi nomi kiritish majburiy!",
        }),
        password: Joi.string().min(8).max(15).trim().required().messages({
            "string.base": "Parol matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Parol bo'sh bo'lishi mumkin emas!",
            "string.min":
                "Parol kamida {#limit} ta belgidan iborat bo'lishi kerak!",
            "string.max":
                "Parol ko'pi bilan {#limit} ta belgidan iborat bo'lishi kerak!",
            "any.required": "Parol kiritish majburiy!",
        }),
        phone: Joi.string().trim().required().messages({
            "string.base": "Telefon raqam matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Telefon raqam bo'sh bo'lishi mumkin emas!",
            "any.required": "Telefon raqam kiritish majburiy!",
        }),
        branchId: Joi.string().required().messages({
            "string.base": "Filial matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Filial bo'sh bo'lishi mumkin emas!",
            "any.required": "Filial kiritish majburiy!",
        }),
        role: Joi.string().valid("ADMIN", "SUPERADMIN").required().messages({
            "string.base": "Role matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Role bo'sh bo'lishi mumkin emas!",
            "any.only": "Role noto'g'ri kiritilgan!",
            "any.required": "Role kiritish majburiy!",
        }),
    });
};

exports.adminUpdateSchema = (req) => {
    return Joi.object({
        name: Joi.string().min(3).max(255).messages({
            "string.base": "Ism matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Ism bo'sh bo'lishi mumkin emas!",
            "string.min":
                "Ism kamida {#limit} ta belgidan iborat bo'lishi kerak!",
            "string.max":
                "Ism ko'pi bilan {#limit} ta belgidan iborat bo'lishi kerak!",
        }),
        username: Joi.string().min(3).max(255).trim().messages({
            "string.base":
                "Foydalanuvchi nomi matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Foydalanuvchi nomi bo'sh bo'lishi mumkin emas!",
            "string.min":
                "Foydalanuvchi nomi kamida {#limit} ta belgidan iborat bo'lishi kerak!",
            "string.max":
                "Foydalanuvchi nomi ko'pi bilan {#limit} ta belgidan iborat bo'lishi kerak!",
        }),
        password: Joi.string()
            .min(8)
            .max(15)
            .trim()
            .optional()
            .allow("", null)
            .messages({
                "string.base": "Parol matn ko'rinishida bo'lishi kerak!",
                "string.empty": "Parol bo'sh bo'lishi mumkin emas!",
                "string.min":
                    "Parol kamida {#limit} ta belgidan iborat bo'lishi kerak!",
                "string.max":
                    "Parol ko'pi bilan {#limit} ta belgidan iborat bo'lishi kerak!",
            }),
        phone: Joi.string().trim().messages({
            "string.base": "Telefon raqam matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Telefon raqam bo'sh bo'lishi mumkin emas!",
        }),
        role: Joi.string().valid("ADMIN", "SUPERADMIN").messages({
            "string.base": "Role matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Role bo'sh bo'lishi mumkin emas!",
            "any.only": "Role noto'g'ri kiritilgan!",
        }),
        branchId: Joi.string().optional().messages({
            "string.base": "Filial matn ko'rinishida bo'lishi kerak!",
            "string.empty": "Filial bo'sh bo'lishi mumkin emas!",
        })
    });
};
