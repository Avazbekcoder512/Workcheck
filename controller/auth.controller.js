import { EXPIREDTIME, isProduction, REFRESH_EXPIRED_TIME } from "../config/config.js";
import { cryptoManeger } from "../helper/crypto.js";
import prisma from "../prisma/setup.js";
import { loginSchema } from "../validator/authValidator/authValidate.js";

const LEVEL_CONFIG = [
    { maxAttempts: 5, blockDurationMs: 1 * 60 * 1000 },
    { maxAttempts: 3, blockDurationMs: 1 * 60 * 1000 },
    { maxAttempts: 2, blockDurationMs: 24 * 60 * 60 * 1000 },
];

// const authentication = async (req, res, next) => {
//     try {
//         const ip = req.ip
//         const now = new Date()

//         const schema = loginSchema(req)
//         const { error, value } = schema.validate(req.body, {
//             abortEarly: false,
//         });
//         if (error) {
//             return res.status(400).send({
//                 success: false,
//                 error: error.details[0].message,
//             });
//         }

//         if (!value) {
//             return res.status(400).send({
//                 success: false,
//                 error: req.__('error.value')
//             })
//         }
//         const { username, password } = value

//         const admin = await prisma.admins.findFirst({
//             where: {
//                 username
//             }
//         })

//         const key = admin ? { username: username, ipAddress: null } : { username: null, ipAddress: ip }

//         let block = await prisma.loginBlock.findFirst({ where: key })

//         if (block?.blockedUntil && block.blockedUntil > now) {
//             const secLeft = Math.ceil((block.blockedUntil - now) / 1000)
//             return res.status(429).send({
//                 success: false,
//                 error: `Hozir bloklangansiz. Qolgan vaqt: ${secLeft} soniya.`,
//             })
//         }

//         // if (!admin) {
//         //     return res.status(404).send({
//         //         success: false,
//         //         error: req.__('error.username')
//         //     })
//         // }

//         const verifypass = await cryptoManeger.pass.verify(password, admin.password)

//         await prisma.loginAttempt.create({
//             data: {
//                 username: admin ? username : null,
//                 ipAddress: admin ? null : ip,
//                 success: verifypass,
//             }
//         })

//         // if (!verifypass) {
//         //     return res.status(400).send({
//         //         success: false,
//         //         error: req.__('error.password')
//         //     })
//         // }

//         if (verifypass) {
//             if (block) {
//                 await prisma.loginBlock.delete({ where: { id: block.id } })
//             }
//             return next()
//         }

//         if (!block) {
//             block = await prisma.loginBlock.create({
//                 data: {
//                     ...key, failLevel: 0, attempts: 0, blockedUntil: null
//                 }
//             })
//         }

//         const cfg = LEVEL_CONFIG[block.failLevel]
//         block.attempts += 1

//         if (block.attempts > cfg.maxAttempts) {
//             const nextLevel = Math.min(block.failLevel + 1, LEVEL_CONFIG.length - 1)
//             const nextCfg = LEVEL_CONFIG[nextLevel]

//             block = await prisma.loginBlock.update({
//                 where: { id: block.id },
//                 data: {
//                     failLevel: nextLevel,
//                     attempts: 0,
//                     blockedUntil: new Date(now.getTime() + nextCfg.blockDurationMs),
//                 }
//             })

//             const secBlock = Math.ceil(nextCfg.blockDurationMs / 1000)
//             return res.status(429).send({
//                 success: false,
//                 error: `Ko‘p xato kirdingiz. Keyingi urinishingiz ${secBlock} soniyadan so‘ng.`,
//             })
//         }

//         await prisma.loginBlock.update({
//             where: { id: block.id },
//             data: { attempts: block.attempts }
//         })

//         const triesLeft = cfg.maxAttempts - block.attempts + 1;
//             res.status(401).json({
//             success: false,
//             error: `Parol noto‘g‘ri. ${triesLeft} urinish qoldi bu shu darajada.`,
//         });



//         const refreshToken = cryptoManeger.refresh.generate({
//             id: admin.id,
//             role: admin.role,
//             createdTime: new Date().getTime(),
//             expiredTime: REFRESH_EXPIRED_TIME
//         })

//         const token = cryptoManeger.token.generate({
//             id: admin.id,
//             role: admin.role,
//             createdTime: new Date().getTime(),
//             expiredTime: EXPIREDTIME
//         })

//         res.cookie('refreshToken', refreshToken, {
//             httpOnly: true,
//             secure: isProduction,
//             sameSite: "None",
//             maxAge: 7 * 24 * 60 * 60 * 1000
//         })

//         return res.status(200).send({
//             success: true,
//             error: false,
//             message: req.__('success.login'),
//             token,
//             role: admin.role,
//         })
//     } catch (error) {
//         throw error;
//     }
// };

// const LEVEL_CONFIG = [
//     { maxAttempts: 5, blockDurationMs: 1 * 60 * 1000 },       // 1 daqiqa
//     { maxAttempts: 3, blockDurationMs: 2 * 60 * 60 * 1000 },  // 2 soat
//     { maxAttempts: 2, blockDurationMs: 24 * 60 * 60 * 1000 }, // 24 soat
// ];

const authentication = async (req, res) => {
    try {
        const ip = req.ip;
        const now = new Date();

        // Validatsiya
        const { error, value } = loginSchema(req).validate(req.body, { abortEarly: false });
        if (error) {
            return res.status(400).json({ success: false, error: error.details[0].message });
        }

        const { username, password } = value;
        const admin = await prisma.admins.findFirst({ where: { username } });

        // Blokni aniqlash kaliti
        const key = admin
            ? { username: username, ipAddress: null }
            : { username: null, ipAddress: ip };
        let block = await prisma.loginBlock.findFirst({ where: key });

        // Hozircha bloklanganmi?
        if (block?.blockedUntil > now) {
            const secLeft = Math.ceil((block.blockedUntil - now) / 1000);
            return res.status(429).json({
                success: false,
                error: `Hozir bloklangansiz. Qolgan vaqt: ${secLeft} soniya.`,
            });
        }

        // Foydalanuvchi topilmasa
        if (!admin) {
            return res.status(404).json({ success: false, error: req.__('error.username') });
        }

        // Parolni tekshirish
        const verifypass = await cryptoManeger.pass.verify(password, admin.password);

        // Urinishni yozish
        await prisma.loginAttempt.create({
            data: {
                username: admin.username,
                ipAddress: admin ? null : ip,
                success: verifypass,
            },
        });

        if (!verifypass) {
            // Birinchi marta blok yozuvi yo‘q bo‘lsa yaratish
            if (!block) {
                block = await prisma.loginBlock.create({
                    data: { ...key, failLevel: 0, attempts: 0, blockedUntil: null },
                });
            }

            // Urinish miqdorini oshirish
            const cfg = LEVEL_CONFIG[block.failLevel];
            const attempts = block.attempts + 1;

            if (block.attempts > cfg.maxAttempts) {
                // bloklash vaqtini shu darajadagi cfg’dan olamiz:
                const blockDurationMs = cfg.blockDurationMs;
                const blockedUntil = new Date(now.getTime() + blockDurationMs);

                // darajani oshiramiz, lekin vaqt cfg’dagi
                const nextLevel = Math.min(block.failLevel + 1, LEVEL_CONFIG.length - 1);
                await prisma.loginBlock.update({
                    where: { id: block.id },
                    data: {
                        failLevel: nextLevel,
                        attempts: 0,
                        blockedUntil
                    }
                });

                const secBlock = Math.ceil(blockDurationMs / 1000);
                return res.status(429).json({
                    success: false,
                    error: `Ko‘p xato kirdingiz. Keyingi urinishingiz ${secBlock} soniyadan so‘ng.`,
                });
            }

            // Hozirgi bosqichga urinishni yangilash
            await prisma.loginBlock.update({
                where: { id: block.id },
                data: { attempts },
            });

            const triesLeft = cfg.maxAttempts - attempts + 1;
            return res.status(401).json({
                success: false,
                error: `Parol noto‘g‘ri. ${triesLeft} urinish qoldi.`,
            });
        }

        // Muvaffaqiyatli login bo‘lsa – blokni tozalash
        if (block) {
            await prisma.loginBlock.delete({ where: { id: block.id } });
        }

        // Token va cookie yaratish
        const refreshToken = cryptoManeger.refresh.generate({
            id: admin.id,
            role: admin.role,
            createdTime: now.getTime(),
            expiredTime: REFRESH_EXPIRED_TIME,
        });
        const token = cryptoManeger.token.generate({
            id: admin.id,
            role: admin.role,
            createdTime: now.getTime(),
            expiredTime: EXPIREDTIME,
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: 'None',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return res.status(200).json({
            success: true,
            message: req.__('success.login'),
            token,
            role: admin.role,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, error: 'Server xatosi' });
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

export { authentication, authorization, checkauth, indetification, logout, refresh };