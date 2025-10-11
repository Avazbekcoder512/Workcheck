const { TELEGRAM_BOT_TOKEN, TELEGRAM_BOT_CHATID } = require("../config/config");

function escapeMarkdownV2(str = "") {
    return String(str).replace(/([_*[\]()~`>#+\-=|{}.!])/g, "\\$1");
}

function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const message = err.message || "Serverda xatolik yuz berdi";

    if (status === 500) {
        console.error(err);

        if (TELEGRAM_BOT_TOKEN && TELEGRAM_BOT_CHATID) {
            if (typeof fetch !== "function") {
                console.warn(
                    "Global fetch topilmadi — telegram xabari yuborilmadi."
                );
            } else {
                const header = "💼 WorkCheck: ⚠️ Server xatosi\n\n";

                const details = [
                    `Status:              ${status}`,
                    `URL:                 ${req.originalUrl}`,
                    `Method:              ${req.method}`,
                    `Message:             ${message}`,
                ]
                    .map((line) => `> ${escapeMarkdownV2(line)}`)
                    .join("\n");

                const stackLines = err.stack
                    ? err.stack
                          .split("\n")
                          .slice(0, 6)
                          .map((l) => `> ${escapeMarkdownV2(l.trim())}`)
                          .join("\n")
                    : "> —";

                const text = header + details + "\n" + stackLines;

                fetch(
                    `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            chat_id: TELEGRAM_BOT_CHATID,
                            text,
                            parse_mode: "MarkdownV2",
                        }),
                    }
                ).catch((tgErr) => {
                    console.error(
                        "Telegramga yuborishda xato:",
                        tgErr && tgErr.message ? tgErr.message : tgErr
                    );
                });
            }
        }
    }

    res.status(status).json({ error: message });
}

module.exports = errorHandler;