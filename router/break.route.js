const { Router } = require("express");
const breakController = require("../controllers/break.controller");

const router = Router();

router
    .post(
        "/break-off/create",
        authorization("SUPERADMIN", "ADMIN"),
        breakController.create
    )
    .get(
        "/break-offs",
        authorization("SUPERADMIN", "ADMIN"),
        breakController.getAll
    )
    .put(
        "/break-off/:id/update",
        authorization("SUPERADMIN", "ADMIN"),
        breakController.update
    )
    .delete(
        "/break-off/:id/delete",
        authorization("SUPERADMIN", "ADMIN"),
        breakController.delete
    );

module.exports = router;
