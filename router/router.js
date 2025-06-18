import adminRouter from "./admin/adminRouter.js"

export const appRouter = (app) => {
    app.use('/', adminRouter)
}