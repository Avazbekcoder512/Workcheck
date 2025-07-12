import express from "express";
import i18n from "./helper/i18n.js";
import { createServer } from 'http'
import { Server } from 'socket.io'
import { FRONTEND_URL_1, FRONTEND_URL_2, FRONTEND_URL_3, FRONTEND_URL_4, PORT } from "./config/config.js";
import cors from "cors";
import { appRouter } from "./router/router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(i18n.init)

app.use((req, res, next) => {
  const lang = req.headers['accept-language'] || 'uz'

  i18n.setLocale(req, lang)
  next()
})

app.use(cors({
  origin: [FRONTEND_URL_1, FRONTEND_URL_2, FRONTEND_URL_3, FRONTEND_URL_4],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

appRouter(app);

const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

app.use((error, req, res, next) => {
  console.log(error);

  return res.status(500).send({
    success: false,
    error: "Serverda ichki xatolik!",
  });
});

const Port = PORT || 3000;
server.listen(Port, () => {
  console.log(`Server ishga tushdi... Port:${Port}`);
});
