import multer from "multer";
import fs from "fs"
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!fs.existsSync(path.join(__dirname, "Image"))) fs.mkdirSync(path.join(__dirname, "Image"))

const storage = multer.diskStorage({
    destination: "image/",
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Math.floor(Math.random() * 1000000) + path.extname(file.originalname).toLowerCase())
    }
})

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        if (
            file.mimetype == "image/jpeg" || file.mimetype == "image/jpg" ||
            file.mimetype == "image/png" || file.mimetype == "image/avf" ||
            file.mimetype == "image/webp" || file.mimetype == "image/svg" ||
            file.mimetype == "image/ico"
        ) {
            cb(null, true)
        } else {
            cb(new Error('Faqat rasm fayllarga ruxsat beriladi'), false)
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 }
})

export default upload