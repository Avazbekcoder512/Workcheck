const adminRouter = require("./admin.route.js");
const loginRouter = require("./auth.route.js");
const profileRouter = require("./profile.route.js");
const branchRouter = require("./branch.route.js");
const breakRouter = require("./break.route.js");
const dayOffRouter = require("./dayoff.route.js");
const shiftRouter = require("./shift.route.js");
const { identification } = require("../middleware/token.middleware.js");

exports.appRouter = (app) => {
    app.use("/", loginRouter);

    app.use("/", identification, adminRouter);
    app.use("/", identification, profileRouter);
    app.use("/", identification, branchRouter);
    app.use("/", identification, breakRouter);
    app.use("/", identification, shiftRouter);
    app.use("/", identification, dayOffRouter);
};