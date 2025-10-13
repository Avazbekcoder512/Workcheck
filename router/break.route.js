const { Router } = require("express");
const breakController = require("../controllers/break.controller");
const { roleAccessMiddleware } = require("../middleware/token.middleware");

const router = Router();

router
    .post(
        "/break-off/create",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        breakController.create
    )
    .get(
        "/break-offs",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        breakController.getAll
    )
    .put(
        "/break-off/:id/update",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        breakController.update
    )
    .delete(
        "/break-off/:id/delete",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        breakController.delete
    );

module.exports = router;
