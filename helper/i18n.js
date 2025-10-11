const i18n = require("i18n");
const path = require("path");

i18n.configure({
    locales: ["uz", "en", "ru"],
    directory: path.join(process.cwd(), "locales"),
    defaultLocale: "uz",
    objectNotation: true,
    autoReload: true,
    syncFiles: true,
});

module.exports = i18n