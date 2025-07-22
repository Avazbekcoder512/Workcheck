import { EXPIREDTIME, isProduction, REFRESH_EXPIRED_TIME } from "../config/config.js";
import { cryptoManeger } from "../helper/crypto.js";
import prisma from "../prisma/setup.js";
import { loginSchema } from "../validator/authValidator/authValidate.js";

const authentication = async (req, res) => {
    try {
        const ip = req.ip        
        const schema = loginSchema(req)
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
        });
        if (error) {
            return res.status(400).send({
                success: false,
                error: error.details[0].message,
            });
        }

        if (!value) {
            return res.status(400).send({
                success: false,
                error: req.__('error.value')
            })
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
                error: req.__('error.admin_not_found')
            })
        }

        const verifypass = await cryptoManeger.pass.verify(password, admin.password)

        if (!verifypass) {
            return res.status(400).send({
                success: false,
                error: req.__('error.password')
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
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        return res.status(200).send({
            success: true,
            error: false,
            message: req.__('success.login'),
            token,
            ip,
            role: admin.role
        })
    } catch (error) {
        throw error;
    }
};

const refresh = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (!refreshToken) {
            return res.status(403).send({
                success: false,
                error: req.__('error.refresh_not_found')
            })
        }

        const decoded = cryptoManeger.refresh.verify(refreshToken)

        if (decoded === undefined) {
            return res.status(403).send({
                success: false,
                error: req.__('error.forbidden')
            })
        }

        if (decoded.role !== "ADMIN" && decoded.role !== 'SUPERADMIN') {
            return res.status(403).send({
                success: false,
                error: req.__('error.forbidden')
            })
        }

        if (decoded.createdTime && decoded.expiredTime) {
            if (((new Date().getTime()) - decoded.createdTime) > decoded.expiredTime) {
                return res.status(401).send({
                    success: false,
                    error: req.__('error.expired_token')
                })
            }
        } else {
            return res.status(403).send({
                success: false,
                error: req.__('error.forbidden')
            })
        }

        if (decoded.id) {
            const id = Number(decoded.id)

            if (isNaN(id)) {
                return res.status(400).send({
                    success: false,
                    error: req.__('error.id')
                });
            }

            const admin = await prisma.admins.findUnique({
                where: {
                    id
                }
            })

            if (!admin) {
                return res.status(403).send({
                    success: false,
                    error: req.__('error.forbidden')
                })
            }

            const token = cryptoManeger.token.generate({
                id: admin.id,
                role: admin.role,
                createdTime: new Date().getTime(),
                expiredTime: EXPIREDTIME

            })

            return res.status(200).send({
                success: true,
                error: false,
                message: req.__('success.refresh_token'),
                token
            })
        } else {
            return res.status(403).send({
                success: false,
                error: req.__('error.forbidden')
            })
        }

    } catch (error) {
        throw error
    }
}

const indetification = async (req, res, next) => {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return res.status(404).send({
            error: req.__('error.token_not_found'),
        });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).send({
            success: false,
            error: req.__('error.login')
        })
    }

    const decode = cryptoManeger.token.verify(token)

    if (decode === undefined) {
        return res.status(403).send({
            success: false,
            error: req.__('error.forbidden')
        })
    }

    if (decode.role !== "ADMIN" && decode.role !== "SUPERADMIN") {
        return res.status(403).send({
            success: false,
            error: req.__('error.forbidden')
        })
    }

    if (decode.createdTime && decode.expiredTime) {
        if (((new Date().getTime()) - decode.createdTime) > decode.expiredTime) {
            return res.status(401).send({
                success: false,
                error: req.__('error.expired_token')
            })
        }
    } else {
        return res.status(403).send({
            success: false,
            error: req.__('error.forbidden')
        })
    }

    if (decode.id) {
        const id = Number(decode.id)
        const admin = await prisma.admins.findUnique({
            where: {
                id
            }
        })

        if (!admin) {
            return res.status(403).send({
                success: false,
                error: req.__('error.forbidden')
            })
        }
        req.user = admin
    } else {
        return res.status(403).send({
            success: false,
            error: req.__('error.forbidden')
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
                    error: req.__('error.not_allowed')
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

const logout = async (req, res) => {
    try {
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'None'
        })

        return res.status(200).send({
            success: true,
            message: req.__('success.logout')
        })
    } catch (error) {
        throw error
    }
}

export { authentication, refresh, indetification, authorization, checkauth, logout }