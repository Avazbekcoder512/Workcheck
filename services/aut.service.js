const {
    REFRESH_EXPIRED_TIME,
    EXPIREDTIME,
    isProduction,
} = require("../config/config");
const { cryptoManeger } = require("../helper/crypto");
const prisma = require("../prisma/setup");
const { loginSchema } = require("../validator/auth.validator");

const LEVEL_CONFIG = [
    { maxAttempts: 5, blockDurationMs: 1 * 60 * 1000 },
    { maxAttempts: 3, blockDurationMs: 1 * 60 * 1000 },
    { maxAttempts: 2, blockDurationMs: 24 * 60 * 60 * 1000 },
];

class authService {
    async login(req, data) {
        const ip = req.ip;
        const now = new Date();

        const schema = loginSchema(req);
        const { error, value } = schema.validate(data, { abortEarly: false });

        if (error) {
            const notAllowedErrors = error.details.filter(
                (d) => d.type === "object.unknown"
            );

            if (notAllowedErrors.length > 0) {
                throw {
                    status: 400,
                    message: "Siz notoʻgʻri maʻlumot yubordingiz!",
                };
            }

            throw {
                status: 400,
                message: error.message,
            };
        }

        const admin = await prisma.admins.findUnique({
            where: { username: value.username },
        });

        const key = admin
            ? { username: value.username, ipAddress: null }
            : { username: null, ipAddress: ip };
        let block = await prisma.loginBlock.findFirst({ where: key });

        if (block?.blockedUntil > now) {
            const secLeft = Math.ceil((block.blockedUntil - now) / 1000);
            throw {
                status: 429,
                message: `Hozir bloklangansiz. Qolgan vaqt: ${secLeft} soniya.`,
            };
        }

        if (!admin) {
            throw {
                status: 400,
                message: "Username noto'g'ri!",
            };
        }

        const verifypass = await cryptoManeger.pass.verify(
            value.password,
            admin.password
        );

        await prisma.loginAttempt.create({
            data: {
                username: admin.username,
                ipAddress: admin ? null : ip,
                success: verifypass,
            },
        });

        if (!verifypass) {
            if (!block) {
                block = await prisma.loginBlock.create({
                    data: {
                        ...key,
                        failLevel: 0,
                        attempts: 0,
                        blockedUntil: null,
                    },
                });
            }

            const cfg = LEVEL_CONFIG[block.failLevel];
            const attempts = block.attempts + 1;

            if (block.attempts > cfg.maxAttempts) {
                const blockDurationMs = cfg.blockDurationMs;
                const blockedUntil = new Date(now.getTime() + blockDurationMs);

                const nextLevel = Math.min(
                    block.failLevel + 1,
                    LEVEL_CONFIG.length - 1
                );
                await prisma.loginBlock.update({
                    where: { id: block.id },
                    data: {
                        failLevel: nextLevel,
                        attempts: 0,
                        blockedUntil,
                    },
                });

                const secBlock = Math.ceil(blockDurationMs / 1000);
                throw {
                    status: 429,
                    message: `Ko‘p xato kirdingiz. Keyingi urinishingiz ${secBlock} soniyadan so‘ng!`,
                };
            }

            await prisma.loginBlock.update({
                where: { id: block.id },
                data: { attempts },
            });

            const triesLeft = cfg.maxAttempts - attempts + 1;
            throw {
                status: 401,
                message: `Parol noto‘g‘ri. ${triesLeft} urinish qoldi.`,
            };
        }

        if (block) {
            await prisma.loginBlock.delete({ where: { id: block.id } });
        }

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

        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: isProduction,
            sameSite: "None",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        return {
            token,
            role: admin.role,
        };
    }
}


module.exports = new authService()