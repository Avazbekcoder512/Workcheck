const Joi = require("joi");

const dateItem = Joi.string()
    .pattern(/^\d{4}-\d{2}-\d{2}$/)
    .custom((value, helpers) => {
        const [yyyy, mm, dd] = value.split("-").map(Number);
        const d = new Date(yyyy, mm - 1, dd);

        if (
            d.getFullYear() !== yyyy ||
            d.getMonth() !== mm - 1 ||
            d.getDate() !== dd
        ) {
            return helpers.error("any.invalid");
        }

        return value;
    })
    .messages({
        "string.pattern.base":
            "Sana YYYY-MM-DD formatida bo‘lishi kerak (masalan, 2023-12-31)!",
        "string.empty": "Sana bo‘sh bo‘lishi mumkin emas!",
        "any.invalid": "Noto'g'ri sana — bunday kun oyda mavjud emas.",
    });

exports.createDayOffSchema = (req) => {
    return Joi.object({
        name: Joi.string().empty().required().messages({
            "string.base": "Dam olish kuni nomi matn boʻlishi kerak!",
            "string.empty": "Dam olish kuni nomi boʻsh boʻlmasligi kerak!",
            "any.required": "Dam olish kuni nomi kiritilishi shart!",
        }),
        dates: Joi.array().max(5).items(dateItem).required().messages({
            "array.max": "Eng ko‘p 5 ta sana kiritish mumkin.",
            "any.required": "Dam olish kunlari sanalari kiritilishi shart!",
        }),
    });
};

exports.updateDayOffSchema = (req) => {
    return Joi.object({
        name: Joi.string().empty().required().messages({
            "string.base": "Dam olish kuni nomi matn boʻlishi kerak!",
            "string.empty": "Dam olish kuni nomi boʻsh boʻlmasligi kerak!",
        }),
        dates: Joi.array().max(5).items(dateItem).messages({
            "array.max": "Eng ko‘p 5 ta sana kiritish mumkin.",
        }),
    });
};
