const adminController = require("../controllers/admin.controller");
const { upload } = require("../helper/multer");
const express = require("express");
const { roleAccessMiddleware } = require("../middleware/token.middleware");

const router = express.Router();

router
    .post(
        "/admin/create",
        roleAccessMiddleware("SUPERADMIN"),
        upload.single("image"),
        adminController.create
    )
    .get(
        "/admins",
        roleAccessMiddleware("ADMIN", "SUPERADMIN"),
        adminController.getAll
    )
    .get(
        "/admin/:id",
        roleAccessMiddleware("SUPERADMIN"),
        adminController.getOne
    )
    .put(
        "/admin/:id/update",
        roleAccessMiddleware("SUPERADMIN"),
        upload.single("image"),
        adminController.update
    )
    .delete(
        "/admin/:id/delete",
        roleAccessMiddleware("SUPERADMIN"),
        adminController.delete
    );

module.exports = router;
