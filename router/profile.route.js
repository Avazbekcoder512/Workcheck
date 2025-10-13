const { Router } = require("express");
const profileController = require("../controllers/profile.controller");
const { upload } = require("../helper/multer");
const router = Router();

router
    .get("/profile", profileController.profile)
    .put("/profile/update", upload.single("image"), profileController.update);

module.exports = router;
