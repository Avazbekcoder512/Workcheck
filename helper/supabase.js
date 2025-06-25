import multer from "multer";
import fs from "fs"
import path from 'path'
import { createClient } from "@supabase/supabase-js"
import { BUCKET_NAME, SUPABASE_KEY, SUPABASE_URL } from "../config/config.js";


const supabase = createClient(
    SUPABASE_URL,
    SUPABASE_KEY
)
const bucketName = BUCKET_NAME
const file_size = 5 * 1024 * 1024
// const storage = multer.memoryStorage()

// const fileFilter = (req, file, cb) => {
//     if (file.mimetype.startsWith('image/')) {
//         cb(null, true)
//     } else {
//         cb(new Error('Faqat rasm fayllarga ruxsat beriladi'), false)
//     }
// }

// const upload = multer({
//     storage,
//     limits: { fileSize: file_size },
//     fileFilter
// })

// const generateUniqueFileName = (originalName) => {
//     const ext = path.extname(originalName)
//     const randomStr = Math.random().toString(36).substring(2, 10)
//     const timestamp = Date.now()
//     return `${randomStr}_${timestamp}${ext}`
// }

// const uploadImage = async (req, res, next) => {
//     try {
//         if (!req.file) {
//             return res.status(400).send({
//                 success: false,
//                 error: "Rasm kiritilmadi!"
//             })
//         }

//         const fileName = generateUniqueFileName(req.file.originalName)
//         const filePath = `admins/${fileName}`

//         const { error } = await supabase.storage
//             .from('images')
//             .upload(filePath, req, file.buffer, {
//                 contentType: req.file.mimetype,
//                 upsert: false
//             })

//         if (error) {
//             throw error
//         }

//         const { publicUrl } = supabase
//             .storage
//             .from('images')
//             .getPublicUrl(filePath)

//         req.imageUrl = publicUrl
//     } catch (error) {
//         if (err.code === 'LIMIT_FILE_SIZE') {
//             return res.status(413).json({ error: 'Rasm hajmi 5 MB dan oshmasligi kerak' })
//         }

//         throw error
//     }
// }

const storage = {
    upload: async (fileName, filePath) => {
        try {

            const file = fs.createReadStream(filePath)
            const contentType = mime.lookup(fileName)
            const { data, error, uploadError } = await supabase
                .storage
                .from(bucketName)
                .upload(fileName, file, {
                    cacheControl: '3600',
                    upsert: false,
                    contentType
                })

            if (uploadError ) throw uploadError

            const { data: urlData} = supabase
            .storage
            .from(bucketName)
            .getPublicUrl(fileName)

            return imageUrl = urlData.publicUrl
        } catch (error) {
            throw error
        }
    },

    delete: async (fileName) => {
        const { error } = await supabase
        .storage
        .from(bucketName)
        .remove([fileName])
        if (error) throw error
    }
}

export default storage
// export { upload, uploadImage}