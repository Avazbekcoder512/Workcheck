const { Router } = require("express");
const dayoffController = require("../controllers/dayoff.controller");
const { roleAccessMiddleware } = require("../middleware/token.middleware");

const router = Router();

router
    .post(
        "/day-off/create",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        dayoffController.create
    )
    .get(
        "/day-offs",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        dayoffController.getAll
    )
    .delete(
        "/day-offs/:id/delete",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        dayoffController.delete
    );

module.exports = router;
