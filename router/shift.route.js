const { Router } = require("express");
const shiftController = require("../controllers/shift.controller");
const { roleAccessMiddleware } = require("../middleware/token.middleware");

const router = Router();

router
    .post(
        "/shift/create",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        shiftController.create
    )
    .get(
        "/shifts",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        shiftController.getAll
    )
    .put(
        "/shift/:id/update",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        shiftController.update
    )
    .delete(
        "/shift/:id/delete",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        shiftController.delete
    );

module.exports = router;
