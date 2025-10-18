const Joi = require("joi");

exports.createShiftSchema = (req) => {
    return Joi.object({
        name: Joi.string().required().messages({
            "string.base": "Navbatchilik nomi matn boʻlishi kerak!",
            "string.empty": "Navbatchilik nomi boʻsh boʻlmasligi kerak!",
            "any.required": "Navbatchilik nomini kiritish shart!",
        }),
        startTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
                "string.pattern.base":
                    "Boshlanish vaqti HH:MM formatida bo‘lishi kerak!",
                "string.empty": "Boshlanish vaqti bo‘sh bo‘lishi mumkin emas!",
                "any.required": "Boshlanish vaqtini kiritish shart!",
            }),
        endTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
                "string.pattern.base":
                    "Yakunlanish vaqti HH:MM formatida bo‘lishi kerak!",
                "string.empty": "Yakunlanish vaqti bo‘sh bo‘lishi mumkin emas!",
                "any.required": "Yakunlanish vaqtini kiritish shart!",
            }),
        lateAllow: Joi.number().min(10).max(30).required().messages({
            "number.base": "Kech qolish vaqti raqamda kiritilsin!",
            "number.empty": "Kech qolish vaqti boʻsh boʻlmasligi kerak!",
            "number.min":
                "Kech qolish vaqti {#limit} dan kam boʻlmasligi kerak!",
            "number.max": "Kech qolish vaqti {#limit} dan oshmasligi kerak!",
            "any.required": "Kech qolish vaqtini kiritish shart!",
        }),
    });
};

exports.updateShiftSchema = (req) => {
    return Joi.object({
        name: Joi.string().messages({
            "string.base": "Navbatchilik nomi matn boʻlishi kerak!",
            "string.empty": "Navbatchilik nomi boʻsh boʻlmasligi kerak!",
        }),
        startTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .messages({
                "string.pattern.base":
                    "Boshlanish vaqti HH:MM formatida bo‘lishi kerak!",
                "string.empty": "Boshlanish vaqti bo‘sh bo‘lishi mumkin emas",
            }),
        endTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .messages({
                "string.pattern.base":
                    "Yakunlanish vaqti HH:MM formatida bo‘lishi kerak!",
                "string.empty": "Yakunlanish vaqti bo‘sh bo‘lishi mumkin emas",
            }),
        lateAllow: Joi.number().min(10).max(30).messages({
            "number.base": "Kech qolish vaqti raqamda kiritilsin!",
            "number.empty": "Kech qolish vaqti boʻsh boʻlmasligi kerak!",
            "number.min":
                "Kech qolish vaqti {#limit} dan kam boʻlmasligi kerak!",
            "number.max": "Kech qolish vaqti {#limit} dan oshmasligi kerak!",
        }),
    });
};
