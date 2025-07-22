import express from "express";
import i18n from "./helper/i18n.js";
import { createServer } from 'http'
import { Server } from 'socket.io'
import { CORS, PORT } from "./config/config.js";
import cors from "cors";
import { appRouter } from "./router/router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(i18n.init)

app.use((req, res, next) => {
  const lang = req.headers['accept'] || 'uz'

  i18n.setLocale(req, lang)
  next()
})

app.use(cors({
  origin: CORS.split(','),
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', true)

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

  if (error.message === "Faqat rasm fayllarga ruxsat beriladi") {
    return res.status(400).json({ success: false, error: req.__('validation.image_type') });
  }
  
  return res.status(500).send({
    success: false,
    error: req.__('error.server'),
  });
});

const Port = PORT || 3000;
server.listen(Port, '0.0.0.0', () => {
  console.log(`Server ishga tushdi... Port:${Port}`);
});
