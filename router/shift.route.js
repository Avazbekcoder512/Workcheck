const { Router } = require("express");
const shiftController = require("../controllers/shift.controller");

const router = Router();

router
  .post(
    "/shift/create",
    authorization("SUPERADMIN", "ADMIN"),
    shiftController.create
  )
  .get("/shifts", authorization("SUPERADMIN", "ADMIN"), shiftController.getAll)
  .put(
    "/shift/:id/update",
    authorization("SUPERADMIN", "ADMIN"),
    shiftController.update
  )
  .delete(
    "/shift/:id/delete",
    authorization("SUPERADMIN", "ADMIN"),
    shiftController.delete
  );

module.exports = router;