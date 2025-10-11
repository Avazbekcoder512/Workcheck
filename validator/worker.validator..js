const Joi = require("joi");

exports.workerCreateSchema = (req) => {
    return Joi.object({
        fullname: Joi.string().min(10).max(400).required().messages({
            "string.base":
                "Ishchining toʻliq ismi matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining toʻliq ismi boʻsh boʻlmasligi kerak!",
            "string.min":
                "Ishchining toʻliq ismi kamida {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Ishchining toʻliq ismi koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!",
            "any.required": "Ishchining toʻliq ismini kiritish shart!",
        }),
        position: Joi.string().max(200).required().messages({
            "string.base":
                "Ishchining lavozimi matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining lavozimi boʻsh boʻlmasligi kerak!",
            "string.max":
                "Ishchining lavozimi koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!",
            "any.required": "Ishchining lavozimini kiritish shart!",
        }),
        salary: Joi.number().integer().required().messages({
            "number.base": "Ishchining maoshi son koʻrinishida boʻlishi kerak!",
            "number.empty": "Ishchining maoshi boʻsh boʻlmasligi kerak!",
            "any.requied": "Ishchining maoshini kiritish shart!",
        }),
        phone: Joi.string().required().messages({
            "string.base":
                "Ishchining telefon raqami matn koʻrinishida boʻlishi kerak!",
            "string.empty":
                "Ishchining telefon raqami boʻsh boʻlmasligi kerak!",
            "any.required": "Ishchining telefon raqamini kiritish shart!",
        }),
        age: Joi.number().integer().required().messages({
            "number.base": "Ishchining yoshi son koʻrinishida boʻlishi kerak!",
            "number.empty": "Ishchining yoshi boʻsh boʻlmasligi kerak!",
            "any.required": "Ishchining yoshini kiritish shart!",
        }),
        gender: Joi.string().valid("MALE", "FEMALE").required().messages({
            "string.base": "Ishchining jinsi matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining jinsi boʻsh boʻlmasligi kerak!",
            "any.only": "Ishchining jinsi xato kiritilgan!",
            "any.required": "Ishchining jinsini kiritish shart!",
        }),
        passport: Joi.string().min(9).max(9).required().messages({
            "string.base":
                "Ishchining pasporti matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining pasporti boʻsh boʻlmasligi kerak!",
            "string.min":
                "Ishchining pasporti {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Ishchining pasporti {#limit} ta belgadan iborat boʻlishi kerak!",
            "any.required": "Ishchining pasportini kiritish shart!",
        }),
        is_active: Joi.boolean().required().messages({
            "any.required":
                "Ishchining faol yoki nofaol ekanligini kiritish shart!",
            "boolean.base":
                "Ishchining faol yoki nofaol ekanligi mantiqiy qiymat boʻlishi kerak!",
        }),
    });
};

exports.updateWorkerSchema = (req) => {
    return Joi.object({
        fullname: Joi.string().min(10).max(400).messages({
            "string.base":
                "Ishchining toʻliq ismi matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining toʻliq ismi boʻsh boʻlmasligi kerak!",
            "string.min":
                "Ishchining toʻliq ismi kamida {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Ishchining toʻliq ismi koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!",
        }),
        position: Joi.string().max(200).messages({
            "string.base":
                "Ishchining lavozimi matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining lavozimi boʻsh boʻlmasligi kerak!",
            "string.max":
                "Ishchining lavozimi koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!",
        }),
        salary: Joi.number().integer().messages({
            "number.base": "Ishchining maoshi son koʻrinishida boʻlishi kerak!",
            "number.empty": "Ishchining maoshi boʻsh boʻlmasligi kerak!",
        }),
        phone: Joi.string().messages({
            "string.base":
                "Ishchining telefon raqami matn koʻrinishida boʻlishi kerak!",
            "string.empty":
                "Ishchining telefon raqami boʻsh boʻlmasligi kerak!",
        }),
        age: Joi.number().integer().messages({
            "number.base": "Ishchining yoshi son koʻrinishida boʻlishi kerak!",
            "number.empty": "Ishchining yoshi boʻsh boʻlmasligi kerak!",
        }),
        gender: Joi.string().valid("MALE", "FEMALE").messages({
            "string.base": "Ishchining jinsi matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining jinsi boʻsh boʻlmasligi kerak!",
            "any.only": "Ishchining jinsi xato kiritilgan!",
        }),
        passport: Joi.string().min(9).max(9).messages({
            "string.base":
                "Ishchining pasporti matn koʻrinishida boʻlishi kerak!",
            "string.empty": "Ishchining pasporti boʻsh boʻlmasligi kerak!",
            "string.min":
                "Ishchining pasporti {#limit} ta belgidan iborat boʻlishi kerak!",
            "string.max":
                "Ishchining pasporti {#limit} ta belgadan iborat boʻlishi kerak!",
        }),
        is_active: Joi.boolean().messages({
            "boolean.base":
                "Ishchining faol yoki nofaol ekanligi mantiqiy qiymat boʻlishi kerak!",
        }),
    });
};
