import Joi from "joi";


const workerCreateSchema = Joi.object({
    fullname: Joi.string().empty().min(10).max(400).required().messages({
        'string.base': 'Xodimning Familiyasi, Ismi va Sharifini matnda kiriting!',
        'string.empty': 'Xodimni Familiyasi, Ismi va Sharifini kiriting!',
        'string.min': 'Xodimning toʻliq ismi kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Xodimning toʻliq ismi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Xodimning toʻliq ismi kiritilishi shart!'
    }),
    position: Joi.string().empty().max(200).required().messages({
        'string.base': 'Xodimning lavozimini matnda kiriting!',
        'string.empty': 'Xodimning lavozimini kiritng!',
        'string.max': 'Xodimning lavozimi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi kerak!',
        'any.required': 'Xodimning lavozimi kiritilishi shart!'
    }),
    salary: Joi.number().integer().empty().required().messages({
        'number.base': 'Xodimning Ish haqqini raqamda kiritng!',
        'number.empty': 'Xodimning Ish haqqini kiriting!',
        'any.requied': 'Xodimning ish haqi kiritilish shart!'
    }),
    phone: Joi.string().empty().required({
        'string.base': 'Xodimning telefon raqamini matnda kiriting!',
        'string.empty': 'Xodimning telefon raqamini kiritng!',
        'any.required': 'Xodimning telefon raqami kiritilishi shart!'
    }),
    age: Joi.number().integer().empty().required().messages({
        'number.base': 'Xodimning yoshini raqamda kiriting!',
        'number.empty': 'Xodimning yoshini kiriting!',
        'any.required': 'Xodimning yoshi kiritilishi shart!'
    }),
    gender: Joi.string().empty().valid('MALE', 'FEMALE').required().messages({
        'string.base': 'Xodimning jinsi haqidagi maʻlumotni matnda kiriting!',
        'string.empty': 'Xodimning jinsi haqidagi maʻlumotni kiriting!',
        'any.only': 'Xodimning jinsi faqat Ayol yoki Erkak boʻlishi shart!',
        'any.required': 'Xodimning jinsi haqidagi maʻlumot kiritlishi shart!'
    }),
    passport: Joi.string().empty().min(9).max(9).required().messages({
        'string.base': 'Xodimning pasport seriyasini matnda kiriting!',
        'string.empty': 'Xodimning passport seriyasini kiriting!',
        'string.min': 'Xodimning passport seriyasi kamida {#limit} ta belgidan iborat boʻlishi kerak!',
        'string.max': 'Xodimning passport seriyasi eng koʻpi bilan {#limit} ta belgidan iborat boʻlishi karak!',
        'any.required': 'Xodimning passport seriyasini kiritish shart!'
    }),
    is_active: Joi.boolean().required().messages({
        'any.required': 'Xodim ishda yoki ishda emasligi kiritlishi shart!',
        'boolean.base': 'Xodim ishda yoki ishda emasligi ha yoki yoʻq boʻlishi kerak!'
    })
})

export default workerCreateSchema