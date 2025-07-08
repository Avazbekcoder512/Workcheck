import Joi from "joi";

const updateWorkerSchema = Joi.object({
    fullname: Joi.string().min(10).max(400).messages({
        'string.base': 'Xodimning Familiyasi, Ismi va Sharifini matnda kiriting!',
        'string.min': 'Xodimning toʻliq ismi kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Xodimning toʻliq ismi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
    }),
    position: Joi.string().max(200).messages({
        'string.base': 'Xodimning lavozimini matnda kiriting!',
        'string.max': 'Xodimning lavozimi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
    }),
    salary: Joi.number().integer().messages({
        'number.base': 'Xodimning Ish haqqini raqamda kiritng!',
    }),
    phone: Joi.string().messages({
        'string.base': 'Xodimning telefon raqamini matnda kiriting!',
    }),
    age: Joi.number().integer().messages({
        'number.base': 'Xodimning yoshini raqamda kiriting!',
    }),
    gender: Joi.string().valid('MALE', 'FEMALE').messages({
        'string.base': 'Xodimning jinsi haqidagi maʻlumotni matnda kiriting!',
        'any.only': 'Xodimning jinsi faqat Ayol yoki Erkak boʻlishi shart!',
    }),
    passport: Joi.string().min(9).max(9).messages({
        'string.base': 'Xodimning pasport seriyasini matnda kiriting!',
        'string.min': 'Xodimning passport seriyasi kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Xodimning passport seriyasi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi karak!',
    }),
    is_active: Joi.boolean().messages({
        'boolean.base': 'Xodim ishda yoki ishda emasligi ha yoki yoʻq boʻlishi kerak!'
    })
})

export default updateWorkerSchema