import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().empty('').min(3).max(255).trim().required().messages({
        'string.base': 'Username faqat matn boʻlishi kerak!',
        'string.empty': 'Username kiritilmagan!',
        'string.min': 'Username kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Username eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Username majburiy maydon!'
    }),
    password: Joi.string().empty('').min(8).max(15).trim().required().messages({
        'string.base': 'Parol faqat matn boʻlishi kerak!',
        'string.string': 'Parol kiritilmagan!',
        'string.min': 'Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Parol eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Parol majburiy maydon!'
    }),
})

export const updatePassSchema = Joi.object({
    password: Joi.string().empty('').min(8).max(15).trim().required().messages({
        'string.base': 'Parol faqat matn boʻlishi kerak!',
        'string.empty': 'Parol kiritilmagan!',
        'string.min': 'Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Parol eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Parol majburiy maydon!'
    })
})