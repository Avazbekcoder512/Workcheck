const Joi = require("joi");

exports.createBranchSchema = (req) => {
    return Joi.object({
        name: Joi.string().required().messages({
            "string.base": "Filial nomi matn ko'rinishida boʻlishi kerak!",
            "string.empty": "Filial nomi boʻsh boʻlishi mumkin emas!",
            "any.required": "Filial nomi kiritilishi shart!",
        }),
    });
};

exports.updateBranchSchema = (req) => {
    return Joi.object({
        name: Joi.string().required().messages({
            "string.base": "Filial nomi matn ko'rinishida boʻlishi kerak!",
            "string.empty": "Filial nomi boʻsh boʻlishi mumkin emas!",
            "any.required": "Filial nomi kiritilishi shart!",
        }),
    });
};