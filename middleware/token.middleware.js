const { checkId } = require("../helper/checkId");
const { cryptoManeger } = require("../helper/crypto");
const prisma = require("../prisma/setup");

exports.identification = async (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        throw {
            status: 404,
            message: "Token not found!",
        };
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        throw {
            status: 401,
            message: "Iltimos qayta kirish qiling!",
        };
    }

    const decode = cryptoManeger.token.verify(token);

    if (decode === undefined) {
        throw {
            status: 403,
            message: "Forbidden error!",
        };
    }

    if (decode.role !== "ADMIN" && decode.role !== "SUPERADMIN") {
        throw {
            status: 403,
            message: "Forbidden error!",
        };
    }

    if (decode.createdTime && decode.expiredTime) {
        if (new Date().getTime() - decode.createdTime > decode.expiredTime) {
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

    if (decode.id) {
        const id = checkId(decode.id);
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
        req.user = admin;
    } else {
        throw {
            status: 403,
            message: "Forbidden error!",
        };
    }

    next();
};

exports.roleAccessMiddleware = (...roles) => {
    return (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roles.includes(role)) {
                throw {
                    status: 403,
                    message: "Sizga ruxsat yoʻq!",
                };
            }
            next();
        } catch (error) {
            next(error);
        }
    };
};
