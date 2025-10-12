const { Router } = require("express");
const profileController = require("../controllers/profile.controller");
const router = Router();

router
  .get("/profile", indetification, profileController.profile)
  .put(
    "/profile/update",
    indetification,
    upload.single("image"),
    profileController.update
  );

module.exports = router;
