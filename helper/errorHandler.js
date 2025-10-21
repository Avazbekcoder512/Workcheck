const {
    TELEGRAM_BOT_TOKEN,
    TELEGRAM_BOT_CHATID,
    NODE_ENV,
} = require("../config/config");

function escapeMarkdownV2(str = "") {
    return String(str).replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

function sanitizeSensitiveInfo(text = "") {
    try {
        return String(text).replace(
            /(postgres(?:ql)?:\/\/)([^:@\s]+):([^@]+)@/gi,
            "$1***:***@"
        );
    } catch (e) {
        return text;
    }
}

function isPrismaInitError(err = {}) {
    return (
        err &&
        (err.name === "PrismaClientInitializationError" ||
            /PrismaClientInitializationError/i.test(err.name || ""))
    );
}

function isPrismaKnownRequestError(err = {}) {
    return (
        err &&
        (err.name === "PrismaClientKnownRequestError" ||
            (typeof err.code === "string" && /^P\d{4}$/.test(err.code)))
    );
}

function isPrismaValidationError(err = {}) {
    return (
        err &&
        (err.name === "PrismaClientValidationError" ||
            /PrismaClientValidationError/i.test(err.name || ""))
    );
}

function isPrismaRustPanic(err = {}) {
    return (
        err &&
        (err.name === "PrismaClientRustPanic" ||
            /Rust panic/i.test(err.message || ""))
    );
}

function prismaCodeToResponse(code) {
    switch (code) {
        case "P1001":
            return {
                status: 503,
                userMessage:
                    "Ma'lumotlar bazasiga ulanishda muammo. Iltimos keyinroq qayta urinib ko'ring.",
            };
        case "P2002":
            return {
                status: 409,
                userMessage:
                    "Mazkur ma'lumot allaqachon mavjud (uniq cheklovi buzildi).",
            };
        case "P2003":
            return {
                status: 400,
                userMessage: "Bog'liq yozuv topilmadi yoki cheklov buzildi.",
            };
        case "P2025":
            return { status: 404, userMessage: "So'ralgan yozuv topilmadi." };
        default:
            if (/^P1\d{3}$/.test(code))
                return {
                    status: 503,
                    userMessage: "Ma'lumotlar bazasi bilan bog'liq muammo.",
                };
            if (/^P2\d{3}$/.test(code))
                return {
                    status: 400,
                    userMessage: "So'rov yoki ma'lumot bilan bog'liq xato.",
                };
            return {
                status: 400,
                userMessage: "Ma'lumotlar bilan bog'liq xato.",
            };
    }
}

function sendTelegramNotification(text) {
    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_BOT_CHATID) return;
    if (typeof fetch !== "function") {
        console.warn("Global fetch topilmadi — telegram xabari yuborilmadi.");
        return;
    }

    fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: TELEGRAM_BOT_CHATID,
            text,
            parse_mode: "MarkdownV2",
        }),
    }).catch((tgErr) => {
        console.error(
            "Telegramga yuborishda xato:",
            tgErr && tgErr.message ? tgErr.message : tgErr
        );
    });
}

function buildTelegramText({
    status,
    typeLabel,
    req,
    message,
    code,
    clientVersion,
    stack,
}) {
    const header =
        typeLabel === "DB_UNAVAILABLE"
            ? "💽 WorkCheck: ❗ Ma'lumotlar bazasi uzildi\n\n"
            : "💼 WorkCheck: ⚠️ Server xatosi\n\n";

    const details = [
        `Status:              ${status}`,
        `Type:                ${typeLabel}`,
        `URL:                 ${req.originalUrl}`,
        `Method:              ${req.method}`,
        `Message:             ${sanitizeSensitiveInfo(message)}`,
        `PrismaCode:          ${code || "-"}`,
        `PrismaClientVersion: ${clientVersion || "-"}`,
    ]
        .map((line) => `> ${escapeMarkdownV2(line)}`)
        .join("\n");

    const stackLines = stack
        ? stack
              .split("\n")
              .slice(0, 6)
              .map(
                  (l) =>
                      `> ${escapeMarkdownV2(sanitizeSensitiveInfo(l.trim()))}`
              )
              .join("\n")
        : "> —";

    let text = header + details + "\n" + stackLines;
    return sanitizeSensitiveInfo(text);
}

function errorHandler(err, req, res, next) {
    let status = err.status || 500;
    let userMessage = err.message || "Serverda xatolik yuz berdi";
    let typeLabel = "Error";

    if (isPrismaInitError(err) || isPrismaRustPanic(err)) {
        typeLabel = isPrismaRustPanic(err)
            ? "Prisma_RUST_PANIC"
            : "DB_UNAVAILABLE";
        status = 503;
        userMessage =
            "Ma'lumotlar bazasiga ulanishda muammo. Iltimos keyinroq qayta urinib ko'ring.";
        console.error(
            typeLabel + ":",
            sanitizeSensitiveInfo(err.message || String(err))
        );
    } else if (isPrismaKnownRequestError(err)) {
        const code = err.code || null;
        const mapping = prismaCodeToResponse(code);
        status = mapping.status || status;
        userMessage = mapping.userMessage || userMessage;
        typeLabel = "PrismaClientKnownRequestError";
        console.warn(
            "Prisma Known Error:",
            code,
            sanitizeSensitiveInfo(err.message || "")
        );
        if (err.meta)
            console.warn(
                "Prisma meta:",
                sanitizeSensitiveInfo(JSON.stringify(err.meta))
            );
    } else if (isPrismaValidationError(err)) {
        typeLabel = "PrismaClientValidationError";
        status = 400;
        userMessage = "So'rov parametrlari yoki sintaksisida xato mavjud.";
        console.warn(
            "Prisma validation error:",
            sanitizeSensitiveInfo(err.message || "")
        );
    } else if (status === 500) {
        console.error(err);
        userMessage = err.message || "Serverda xatolik yuz berdi";
    } else {
        console.warn(err && err.message ? err.message : err);
    }

    if (
        [500, 503, 409].includes(status) &&
        TELEGRAM_BOT_TOKEN &&
        TELEGRAM_BOT_CHATID
    ) {
        const text = buildTelegramText({
            status,
            typeLabel,
            req,
            message: userMessage,
            code: err.code,
            clientVersion: err.clientVersion,
            stack: err.stack,
        });
        sendTelegramNotification(text);
    }

    const payload = { error: userMessage };
    if (err.code) payload.code = err.code;
    if (NODE_ENV === "development") {
        payload._debug = {
            name: err.name,
            stack: err.stack ? err.stack.split("\n").slice(0, 8) : undefined,
        };
    }

    res.status(status).json(payload);
}

module.exports = errorHandler;
