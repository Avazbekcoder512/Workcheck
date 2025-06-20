import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const CRYPTO_KEY = process.env.CRYPTO_KEY;
const ALGORITHM = process.env.ALGORITHM;
const EXPIREDTIME = process.env.EXPIRED_TIME
const FRONTEND_URL_1 = process.env.FRONTEND_URL_1
const FRONTEND_URL_2 = process.env.FRONTEND_URL_2
const FRONTEND_URL_3 = process.env.FRONTEND_URL_3

export { PORT, CRYPTO_KEY, ALGORITHM, EXPIREDTIME, FRONTEND_URL_1, FRONTEND_URL_2, FRONTEND_URL_3 };
