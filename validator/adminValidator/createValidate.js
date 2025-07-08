import Joi from "joi";

export const AdminCreateSchema = Joi.object({
    name: Joi.string().min(3).max(255).empty('').required().messages({
        'string.base': 'Ism faqat matn boʻlishi kerak!',
        'string.empty': 'Ismni kiriting!',
        'string.min': 'Ism kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Ism eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Ism majburiy maydon!'
    }),
    username: Joi.string().min(3).max(255).empty('').trim().required().messages({
        'string.base': 'Username faqat matn boʻlishi kerak!',
        'string.empty': 'Usernameni kiriting!',
        'string.min': 'Username kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Username eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Username majburiy maydon!'
    }),
    password: Joi.string().min(8).max(15).empty('').trim().required().messages({
        'string.base': 'Parol faqat matn boʻlishi kerak!',
        'string.empty': 'Parolni kiriting!',
        'string.min': 'Parol kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Parol eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Parol majburiy maydon!'
    }),
    phone: Joi.string().trim().empty('').required().messages({
        'string.base': 'Telefon raqam faqat matn boʻlishi kerak!',
        'string.empty': 'Telefon raqamni kiriting!',
        'any.required': 'Telefon raqam majburiy maydon!'
    }),
    role: Joi.string().empty('').valid("ADMIN", "SUPERADMIN").required().messages({
        'string.base': 'Role faqat matn boʻlishi kerak!',
        'string.base': 'Roleni kiriting!',
        'any.only': 'Role faqat ADMIN yoki SUPERADMIN bo‘lishi mumkin!',
        'any.required': 'Role majburiy maydon!'
    })
})