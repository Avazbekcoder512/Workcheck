const { EXPIREDTIME } = require("../config/config");
const { checkId } = require("../helper/checkId");
const { cryptoManeger } = require("../helper/crypto");
const authService = require("../services/aut.service");

class authController {
    async login(req, res, next) {
        try {
            const data = req.body;
            const result = await authService.login(req, data);

            return res.status(200).json({
                success: true,
                message: "Kirish muvvaffaqiyatli amalga oshdi!",
                token: result.token,
                role: result.role,
            });
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const refreshToken = req.cookies.refreshToken;

            if (!refresh) {
                throw {
                    status: 403,
                    message: "Refresh token mavjud emas!",
                };
            }

            const decoded = cryptoManeger.refresh.verify(refreshToken);

            if (decoded === undefined) {
                throw {
                    status: 403,
                    message: "Forbidden error!",
                };
            }

            if (decoded.role !== "ADMIN" && decoded.role !== "SUPERADMIN") {
                throw {
                    status: 403,
                    message: "Forbidden error!",
                };
            }

            if (decoded.createdTime && decoded.expiredTime) {
                if (
                    new Date().getTime() - decoded.createdTime >
                    decoded.expiredTime
                ) {
                    throw {
                        status: 401,
                        message: "Tokenni vaqti tugagan!",
                    };
                }
            } else {
                throw {
                    status: 403,
                    message: "Forbidden error!",
                };
            }

            if (decoded.id) {
                const id = checkId(decoded.id);

                const admin = await prisma.admins.findUnique({
                    where: {
                        id,
                    },
                });

                if (!admin) {
                    throw {
                        status: 403,
                        message: "Forbidden error!",
                    };
                }

                const token = cryptoManeger.token.generate({
                    id: admin.id,
                    role: admin.role,
                    createdTime: new Date().getTime(),
                    expiredTime: EXPIREDTIME,
                });

                return res.status(200).send({
                    success: true,
                    error: false,
                    message: "Token muvaffaqiyatli yangilandi!",
                    token,
                });
            } else {
                throw {
                    status: 403,
                    message: "Forbidden error!",
                };
            }
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            res.clearCookie("refreshToken", {
                httpOnly: true,
                secure: isProduction,
                sameSite: "None",
            });

            return res.status(200).json({
                success: true,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = new authController();