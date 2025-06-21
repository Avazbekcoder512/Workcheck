import Joi from "joi";

export const updateAdminSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(255).messages({
        'string.base': 'Ism faqat matn boʻlishi kerak',
        'string.alphanum': 'Ism faqat harf va raqamlardan iborat bo‘lishi kerak',
        'string.min': 'Ism kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Ism eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Ism majburiy maydon!'
    }),
    username: Joi.string().alphanum().min(3).max(255).trim().messages({
        'string.base': 'Username faqat matn boʻlishi kerak',
        'string.alphanum': 'Username faqat harf va raqamlardan iborat bo‘lishi kerak',
        'string.min': 'Username kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Username eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Username majburiy maydon!'
    }),
    phone: Joi.string().trim().messages({
        'string.base': 'Telefon raqam faqat matn boʻlishi kerak',
        'any.required': 'Telefon raqam majburiy maydon!'
    }),
    role: Joi.string().valid("ADMIN", "SUPERADMIN").messages({
        'string.base': 'Role faqat matn boʻlishi kerak',
        'any.only': 'Role faqat ADMIN yoki SUPERADMIN bo‘lishi mumkin',
        'any.required': 'Role majburiy maydon!'
    })
})