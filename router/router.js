import { indetification } from "../controller/auth.controller.js";
import adminRouter from "./admin/adminRouter.js";
import loginRouter from "./auth/authRouter.js"
import profileRouter from './profile/profileRouter.js'
import workerRouter from './worker/workerRouter.js'
import branchRouter from './branch/branchRouter.js'
import breakRouter from './break/breakRouter.js'

export const appRouter = (app) => {
    app.use('/', loginRouter)

    app.use('/', indetification, adminRouter)
    app.use('/', indetification, profileRouter)
    app.use('/', indetification, workerRouter)
    app.use('/', indetification, branchRouter)
    app.use('/', indetification, breakRouter)
}