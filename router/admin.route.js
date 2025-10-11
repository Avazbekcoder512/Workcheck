const adminController = require("../controllers/admin.controller");
const { upload } = require("../helper/multer");
const express = require("express");

const router = express.Router();

router
    .post(
        "/admin/create",
        authorization("SUPERADMIN"),
        upload.single("image"),
        adminController.create
    )
    .get(
        "/admins",
        authorization("ADMIN", "SUPERADMIN"),
        adminController.getAll
    )
    .get("/admin/:id", authorization("SUPERADMIN"), adminController.getOne)
    .put(
        "/admin/:id/update",
        authorization("SUPERADMIN"),
        upload.single("image"),
        adminController.update
    )
    .delete(
        "/admin/:id/delete",
        authorization("SUPERADMIN"),
        adminController.delete
    );

module.exports = router;
