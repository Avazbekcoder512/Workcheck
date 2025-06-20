import Joi from "joi";

export const loginSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(255).trim().required().messages({
        'string.base': '"Username" faqat matn boʻlishi kerak',
        'string.alphanum': '"Username" faqat harf va raqamlardan iborat bo‘lishi kerak',
        'string.min': '"Username" kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': '"Username" eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': '"Username" majburiy maydon!'
    }),
    password: Joi.string().min(8).max(15).trim().required().messages({
        'string.base': '"Parol" faqat matn boʻlishi kerak',
        'string.min': '"Parol" kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': '"Parol" eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': '"Parol" majburiy maydon!'
    }),
})