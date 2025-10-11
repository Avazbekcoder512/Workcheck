const { Router } = require("express");
const branchController = require("../controllers/branch.controller");

const router = Router();

router
    .post(
        "/branch/create",
        authorization("SUPERADMIN", "ADMIN"),
        branchController.create
    )
    .get(
        "/branches",
        authorization("SUPERADMIN", "ADMIN"),
        branchController.getAll
    )
    .get(
        "/branch/:id",
        authorization("SUPERADMIN", "ADMIN"),
        branchController.getOne
    )
    .put(
        "/branch/:id/update",
        authorization("SUPERADMIN", "ADMIN"),
        branchController.update
    )
    .delete(
        "/branch/:id/delete",
        authorization("SUPERADMIN", "ADMIN"),
        branchController.delete
    );

module.exports = router;
