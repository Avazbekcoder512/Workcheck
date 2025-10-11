const { indetification } = require("../controllers/auth.controller.js");
const adminRouter = require("./admin.route.js");
import loginRouter from "./auth/authRouter.js";
import profileRouter from "./profile/profileRouter.js";
import workerRouter from "./worker/workerRouter.js";
const branchRouter = require("./branch.route.js");
const breakRouter = require("./break.route.js");
import shiftRouter from "./shift/shiftRouter.js";
import dayOffRouter from "./dayoff/dayOffRouter.js";

exports.appRouter = (app) => {
    app.use("/", loginRouter);

    app.use("/", indetification, adminRouter);
    app.use("/", indetification, profileRouter);
    app.use("/", indetification, workerRouter);
    app.use("/", indetification, branchRouter);
    app.use("/", indetification, breakRouter);
    app.use("/", indetification, shiftRouter);
    app.use("/", indetification, dayOffRouter);
};
