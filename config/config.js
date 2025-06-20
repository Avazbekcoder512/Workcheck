import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const CRYPTO_KEY = process.env.CRYPTO_KEY;
const ALGORITHM = process.env.ALGORITHM;
const EXPIREDTIME = process.env.EXPIRED_TIME

export { PORT, CRYPTO_KEY, ALGORITHM, EXPIREDTIME };
