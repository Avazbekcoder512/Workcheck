import Joi from "joi";

export const AdminCreateSchema = Joi.object({
    name: Joi.string().min(3).max(255).required().messages({
        'string.base': 'Ism faqat matn boʻlishi kerak',
        'string.min': 'Ism kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Ism eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Ism majburiy maydon!'
    }),
    username: Joi.string().min(3).max(255).trim().required().messages({
        'string.base': 'Username faqat matn boʻlishi kerak',
        'string.min': 'Username kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Username eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Username majburiy maydon!'
    }),
    password: Joi.string().min(8).max(15).trim().required().messages({
        'string.base': 'Parol faqat matn boʻlishi kerak',
        'string.min': 'Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Parol eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Parol majburiy maydon!'
    }),
    phone: Joi.string().trim().required().messages({
        'string.base': 'Telefon raqam faqat matn boʻlishi kerak',
        'any.required': 'Telefon raqam majburiy maydon!'
    }),
    role: Joi.string().valid("ADMIN", "SUPERADMIN").required().messages({
        'string.base': 'Role faqat matn boʻlishi kerak',
        'any.only': 'Role faqat ADMIN yoki SUPERADMIN bo‘lishi mumkin',
        'any.required': 'Role majburiy maydon!'
    })
})