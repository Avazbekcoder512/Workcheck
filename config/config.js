import { config } from "dotenv";
config();

const PORT = process.env.PORT;
const CRYPTO_KEY = process.env.CRYPTO_KEY;
const ALGORITHM = process.env.ALGORITHM;
const REFRESH_KEY = process.env.REFRESH_KEY
const EXPIREDTIME = process.env.EXPIRED_TIME
const REFRESH_EXPIRED_TIME = process.env.REFRESH_EXPIRED_TIME
const CORS = process.env.CORS
const SUPABASE_URL = process.env.SUPABASE_URL
const SUPABASE_KEY = process.env.SUPABASE_KEY
const BUCKET_NAME = process.env.BUCKET_NAME
const isProduction = process.env.NODE_ENV === 'production'


export {
    PORT, CRYPTO_KEY, ALGORITHM, EXPIREDTIME, REFRESH_KEY,
    REFRESH_EXPIRED_TIME, CORS,
    SUPABASE_URL, SUPABASE_KEY, BUCKET_NAME, isProduction
};