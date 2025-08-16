import Joi from 'joi'

const dateItem = Joi.string()
    .pattern(/^\d{2}-\d{2}-\d{4}$/)
    .custom((value, helpers) => {
        const [dd, mm, yyyy] = value.split('-').map(Number);
        const d = new Date(yyyy, mm - 1, dd);

        if (
            d.getFullYear() !== yyyy ||
            d.getMonth() !== mm - 1 ||
            d.getDate() !== dd
        ) {
            return helpers.error('any.invalid');
        }

        return value;
    })
    .messages({
        'string.pattern.base': 'Sana "dd-mm-yyyy" formatida bo\'lishi kerak (masalan: 31-12-2025).',
        'any.invalid': 'Noto\'g\'ri sana — bunday kun oyda mavjud emas.'
    });

export const createDayOffSchema = Joi.object({
    name: Joi.string().empty().required().messages({
        'string.base': 'Dam olish kuni nomi matn boʻlishi kerak!',
        'string.empty': "Dam olish kuni nomim boʻsh boʻlmasligi kerak!"
    }),
    dates: Joi.array().max(5).items(dateItem).messages({
        'array.max': 'Eng ko‘p 5 ta sana kiritish mumkin.'
    })
})