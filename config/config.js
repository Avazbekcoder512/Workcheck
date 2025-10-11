const { config } = require("dotenv");
config();

exports.PORT = process.env.PORT;
exports.CRYPTO_KEY = process.env.CRYPTO_KEY;
exports.ALGORITHM = process.env.ALGORITHM;
exports.REFRESH_KEY = process.env.REFRESH_KEY;
exports.EXPIREDTIME = process.env.EXPIRED_TIME;
exports.REFRESH_EXPIRED_TIME = process.env.REFRESH_EXPIRED_TIME;
exports.CORS = process.env.CORS;
exports.SUPABASE_URL = process.env.SUPABASE_URL;
exports.SUPABASE_KEY = process.env.SUPABASE_KEY;
exports.BUCKET_NAME = process.env.BUCKET_NAME;
exports.isProduction = process.env.NODE_ENV === "production";
exports.TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
exports.TELEGRAM_BOT_CHATID = process.env.TELEGRAM_BOT_CHATID;