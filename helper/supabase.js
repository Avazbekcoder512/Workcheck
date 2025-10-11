const { createClient } = require("@supabase/supabase-js");
const { SUPABASE_URL, SUPABASE_KEY, BUCKET_NAME } = require("../config/config");
const { randomUUID } = require("crypto");

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const bucketName = BUCKET_NAME;

exports.storage = {
    upload: async (file) => {
        try {
            const fileName = `${Date.now()}-${randomUUID()}-${
                file.originalname
            }`;
            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(fileName, file.buffer, {
                    cacheControl: "3600",
                    contentType: file.mimetype,
                    upsert: false,
                });

            if (error) throw error;

            const { data: urlData } = supabase.storage
                .from(bucketName)
                .getPublicUrl(data.path);

            return {
                path: data.path,
                url: urlData.publicUrl,
            };
        } catch (error) {
            throw error;
        }
    },

    delete: async (filePath) => {
        const { error } = await supabase.storage
            .from(bucketName)
            .remove([filePath]);
        if (error) throw error;
    },
};