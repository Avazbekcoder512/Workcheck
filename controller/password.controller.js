import { cryptoManeger } from "../helper/crypto.js"
import prisma from "../prisma/setup.js"
import { checkPhoneSchema, resetPasswordSchema } from "../validator/password/password.validate.js"

const checkPhone = async (req, res) => {
    try {
        const schema = checkPhoneSchema(req)
        const { error, value } = schema.validate(req.body, { abortEarly: false })

        if (error) {
            return res.status(400).send({
                success: false, error: error.details[0].message,
            });
        }

        const admin = await prisma.admins.findUnique({ where: { phone: value.phone } })

        if (!admin) {
            return res.status(404).json({
                error: "Bunday telefon raqamga ega admin topilmadi!"
            })
        }

        const generateRandomCode = () =>
            Math.floor(100000 + Math.random() * 900000);

        const resetCode = generateRandomCode();

        // const Token = await getNewToken()
        // const Phone = user.phoneNumber
        // const Message = `Limon.uz saytidagi telefon raqamingizni tasdiqlash kodi ${resetCode}`

        // axios.post('https://notify.eskiz.uz/api/message/sms/send', {
        //     mobile_phone: Phone,
        //     message: Message,
        //     from: process.env.Eskiz_From
        // }, {
        //     headers: {
        //         Authorization: `Bearer ${Token}`
        //     }
        // })
        //     .then(res => console.log(res.data))
        //     .catch(err => console.error('SMS yuborishda xatolik:', err.response?.data || err))

        const updatedAdmin = await prisma.admins.update({
            where: { id: admin.id }, data: {
                verifyCode: resetCode
            }
        })

        return res.status(200).json({
            id: updatedAdmin.id,
            code: resetCode
        })
    } catch (error) {
        throw error
    }
}

const resetPassword = async (req, res) => {
    try {
        const schema = resetPasswordSchema(req)
        const { error, value } = schema.validate(req.body, {
            abortEarly: false
        })

        if (error) {
            return res.status(400).send({
                success: false, error: error.details[0].message,
            });
        }

        const id = value.id
        const admin = await prisma.admins.findUnique({ where: { id } })

        if (!admin) {
            return res.status(404).json({
                error: "Admin topilmadi!"
            })
        }

        if (admin.verifyCode !== value.code) {
            return res.status(400).json({
                error: "tasdiqlash kodi noto'g'ri!"
            })
        }

        const newPass = await cryptoManeger.pass.hash(value.password)

        const updatePass = await prisma.admins.update({
            where: { id },
            data: {
                password: newPass
            }
        })

        return res.status(200).json({
            message: 'Parol yangilandi!'
        })


    } catch (error) {
        throw error
    }
}

export { checkPhone, resetPassword }