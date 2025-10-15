const express = require("express");
const i18n = require("./helper/i18n");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { CORS, PORT } = require("./config/config");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const errorHandler = require("./helper/errorHandler");
const { appRouter } = require("./router/router");
const prismaErrorHandler = require("./helper/prismaErrorHandler");

const app = express();
require('./prisma/setup')
app.use(i18n.init);

// app.use((req, res, next) => {
//     const lang = req.headers["accept"] || "uz";

//     i18n.setLocale(req, lang);
//     next();
// });

app.use(
    cors({
        origin: CORS.split(","),
        credentials: true,
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.set("trust proxy", true);

appRouter(app);

app.use(prismaErrorHandler)
app.use(errorHandler);

const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

app.use((error, req, res, next) => {
    console.log(error);

    if (error.message === "Faqat rasm fayllarga ruxsat beriladi") {
        return res
            .status(400)
            .json({ success: false, error: req.__("validation.image_type") });
    }

    return res.status(500).send({
        success: false,
        error: req.__("error.server"),
    });
});

const Port = PORT || 3000;
server.listen(Port, "0.0.0.0", () => {
    console.log(`Server ishga tushdi... Port:${Port}`);
});
