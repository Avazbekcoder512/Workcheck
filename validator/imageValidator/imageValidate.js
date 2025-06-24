import Joi from "joi";

export const imageSchema = Joi.object({
    originalname: Joi.string().regex(/\.(jpg|jpeg|png|webp)$/i).required()/* .message('Rasm turi notoʻgʻri') */,
    mimetype: Joi.string().valid("image/jpeg", "image/png", "image/gif", "image/webp").required()/* .message('Rasm formati notoʻgʻri') */,
    size: Joi.number().max(5 * 1024 * 1024).required()/* .message('Rasm hajmi 5 mb dan oshmasligi kerak!') */,
    fieldname: Joi.string().valid('image').required()/* .message("Rasm yuklanmadi!") */,
})