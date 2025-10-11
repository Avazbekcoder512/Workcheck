const Joi = require("joi");

exports.createBreakSchema = (req) => {
    return Joi.object({
        name: Joi.string().required().messages({
            "string.base": "Tanaffus nomi matn boʻlishi kerak!",
            "string.empty": "Tanaffus nomi boʻsh boʻlmasligi kerak!",
            "any.required": "Tanaffus nomini kiritish shart!",
        }),
        startTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
                "string.pattern.base": "Vaqt HH:MM formatida bo‘lishi kerak!",
                "string.empty": "Vaqt bo‘sh bo‘lishi mumkin emas!",
            }),
        endTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .required()
            .messages({
                "string.pattern.base": "Vaqt HH:MM formatida bo‘lishi kerak!",
                "string.empty": "Vaqt bo‘sh bo‘lishi mumkin emas!",
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

exports.updateBreakSchema = (req) => {
    return Joi.object({
        name: Joi.string().messages({
            "string.base": "Tanaffus nomi matn boʻlishi kerak!",
            "string.empty": "Tanaffus nomi boʻsh boʻlmasligi kerak!",
        }),
        startTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .messages({
                "string.pattern.base": "Vaqt HH:MM formatida bo‘lishi kerak",
                "string.empty": "Vaqt bo‘sh bo‘lishi mumkin emas",
            }),
        endTime: Joi.string()
            .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
            .messages({
                "string.pattern.base": "Vaqt HH:MM formatida bo‘lishi kerak",
                "string.empty": "Vaqt bo‘sh bo‘lishi mumkin emas",
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
