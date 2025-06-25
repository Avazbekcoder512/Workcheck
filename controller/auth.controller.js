import { EXPIREDTIME, isProduction, REFRESH_EXPIRED_TIME } from "../config/config.js";
import { cryptoManeger } from "../helper/crypto.js";
import prisma from "../prisma/setup.js";
import { loginSchema } from "../validator/authValidator/authValidate.js";

const authentication = async (req, res) => {
    try {
        const { error, value } = loginSchema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message,
            });
        }

        const { username, password } = value

        const admin = await prisma.admins.findFirst({
            where: {
                username
            }
        })

        if (!admin) {
            return res.status(404).send({
                success: false,
                error: 'Bunday usernamega ega admin topilmadi!'
            })
        }

        const verifypass = await cryptoManeger.pass.verify(password, admin.password)

        if (!verifypass) {
            return res.status(400).send({
                success: false,
                error: 'Parol notoʻgʻri!'
            })
        }

        const refreshToken = cryptoManeger.refresh.generate({
            id: admin.id,
            role: admin.role,
            createdTime: new Date().getTime(),
            expiredTime: REFRESH_EXPIRED_TIME
        })

        const token = cryptoManeger.token.generate({
            id: admin.id,
            role: admin.role,
            createdTime: new Date().getTime(),
            expiredTime: EXPIREDTIME
        })
  
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "Strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        res.cookie('token', token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "Strict",
            maxAge: 2 * 60 * 60 * 1000
        })

        return res.status(200).send({
            success: true,
            error: false,
            message: "Kirish muvaffaqiyatli amalga oshirildi!"
        })
    } catch (error) {
        throw error;
    }
};

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookie.refreshToken;

        if (!refreshToken) {
            return res.status(403).send({
                success: false,
                error: "Refresh token mavjud emas!"
            })
        }

        const decoded = cryptoManeger.refresh.verify(refreshToken)

        if (!decoded === undefined) {
            return res.status(403).send({
                success: false,
                error: "Forbidden error!"
            })
        }

        if (decoded.role !== "ADMIN" && decoded.role !== 'SUPERADMIN') {
            return res.status(403).send({
                success: false,
                error: "Forbidden error!"
            })
        }

        if (decoded.createdTime && decoded.expiredTime) {
            if (((new Date().getTime()) - decoded.createdTime) > decoded.expiredTime) {
                return res.status(401).send({
                    success: false,
                    error: "Tokenni vaqti tugagan!"
                })
            }
        } else {
            return res.status(403).send({
                success: false,
                error: "Forbidden error!"
            })
        }

        if (decoded.id) {
            const id = Number(decoded.id)
            const admin = await prisma.admins.findFirst({
                where: {
                    id
                }
            })

            if (!admin) {
                return res.status(403).send({
                    success: false,
                    error: "Forbidden error!"
                })
            }

            const token = cryptoManeger.token.generate({
                id: admin.id,
                role: admin.role,
                createdTime: new Date().getTime(),
                expiredTime: EXPIREDTIME

            })

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: "Strict",
                maxAge: 2 * 60 * 60 * 1000
            })

            return res.status(200).send({
                success: true,
                error: false,
                message: 'Token muvaffaqiyatli yangilandi!'
            })
        } else {
            return res.status(403).send({
                success: false,
                error: "Forbidden error!"
            })
        }

    } catch (error) {
        throw error
    }
}

const indetification = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).send({
            success: false,
            error: "Iltimos qayta kirish qiling!"
        })
    }

    const decode = cryptoManeger.token.verify(token)

    if (decode === undefined) {
        return res.status(403).send({
            success: false,
            error: "Forbidden error!"
        })
    }

    if (decode.role !== "ADMIN" && decode.role !== "SUPERADMIN") {
        return res.status(403).send({
            success: false,
            error: "Forbidden error!"
        })
    }

    if (decode.createdTime && decode.expiredTime) {
        if (((new Date().getTime()) - decode.createdTime) > decode.expiredTime) {
            return res.status(401).send({
                success: false,
                error: "Tokenni vaqti tugagan!"
            })
        }
    } else {
        return res.status(403).send({
            success: false,
            error: "Forbidden error!"
        })
    }

    if (decode.id) {
        const id = Number(decode.id)
        const admin = await prisma.admins.findFirst({
            where: {
                id
            }
        })

        if (!admin) {
            return res.status(403).send({
                success: false,
                error: "Forbidden error!"
            })
        }
        req.user = admin
    } else {
        return res.status(403).send({
            success: false,
            error: "Forbidden error!"
        })
    }

    next()
}

const authorization = (...roles) => {
    return (req, res, next) => {
        try {
            const { role } = req.user

            if (!roles.includes(role)) {
                return res.status(403).send({
                    success: false,
                    error: "Sizga ruxsat yoʻq"
                })
            }
            next()
        } catch (error) {
            throw error
        }
    }
}

const checkauth = async (req, res) => {
    try {
        return res.status(200).send({
            success: true,
            message: "Ok"
        })

    } catch (error) {
        throw error
    }
}

const logout = (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        })

        res.clearCookie('token', {
            httpOnly: true,
            secure: false,
            sameSite: 'Strict'
        })

        return res.status(200).send({
            success: true,
            message: "Chiqish muvaffaqiyatli amalga oshirildi!"
        })
    } catch (error) {
        throw error
    }
}

export { authentication, refresh, indetification, authorization, checkauth, logout }