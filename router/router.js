import { indetification } from "../controller/auth.controller.js";
import adminRouter from "./admin/adminRouter.js";
import loginRouter from "./auth/authRouter.js"

export const appRouter = (app) => {
    app.use('/', loginRouter)
    app.use('/', indetification, adminRouter)
}