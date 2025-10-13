const { Router } = require("express");
const branchController = require("../controllers/branch.controller");
const { roleAccessMiddleware } = require("../middleware/token.middleware");

const router = Router();

router
    .post(
        "/branch/create",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        branchController.create
    )
    .get(
        "/branches",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        branchController.getAll
    )
    .get(
        "/branch/:id",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        branchController.getOne
    )
    .put(
        "/branch/:id/update",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        branchController.update
    )
    .delete(
        "/branch/:id/delete",
        roleAccessMiddleware("SUPERADMIN", "ADMIN"),
        branchController.delete
    );

module.exports = router;
