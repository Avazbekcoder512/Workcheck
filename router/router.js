const { indetification } = require("../controllers/auth.controller.js");
const adminRouter = require("./admin.route.js");
const loginRouter = require("./auth.route.js");
const profileRouter = require("./profile.route.js");
const branchRouter = require("./branch.route.js");
const breakRouter = require("./break.route.js");
const dayOffRouter = require("./dayoff.route.js");
const shiftRouter = require("./shift.route.js");

exports.appRouter = (app) => {
  app.use("/", loginRouter);

  app.use("/", indetification, adminRouter);
  app.use("/", indetification, profileRouter);
  app.use("/", indetification, branchRouter);
  app.use("/", indetification, breakRouter);
  app.use("/", indetification, shiftRouter);
  app.use("/", indetification, dayOffRouter);
};
