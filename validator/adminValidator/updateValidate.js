import Joi from "joi";

export const updateAdminSchema = Joi.object({
    name: Joi.string().min(3).max(255).empty("").messages({
        'string.base': 'Ism faqat matn boʻlishi kerak!',
        'string.empty': 'Ism kiritilmagan!',
        'string.min': 'Ism kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Ism eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Ism majburiy maydon!'
    }),
    username: Joi.string().min(3).max(255).empty('').trim().messages({
        'string.base': 'Username faqat matn boʻlishi kerak!',
        'string.empty': 'Username kiritilmagan!',
        'string.min': 'Username kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Username eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Username majburiy maydon!'
    }),
    phone: Joi.string().empty('').trim().messages({
        'string.base': 'Telefon raqam faqat matn boʻlishi kerak!',
        'string.empty': 'Telefon raqam kiritilmagan!',
        'any.required': 'Telefon raqam majburiy maydon!'
    }),
    role: Joi.string().empty('').valid("ADMIN", "SUPERADMIN").messages({
        'string.base': 'Role faqat matn boʻlishi kerak!',
        'string.empty': 'Role kiritilmagan!',
        'any.only': 'Role faqat ADMIN yoki SUPERADMIN bo‘lishi mumkin!',
        'any.required': 'Role majburiy maydon!'
    })
})