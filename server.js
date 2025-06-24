import express from "express";
import { FRONTEND_URL_1, FRONTEND_URL_2, FRONTEND_URL_3, FRONTEND_URL_4, PORT } from "./config/config.js";
import cors from "cors";
import { appRouter } from "./router/router.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({
  origin: [FRONTEND_URL_1, FRONTEND_URL_2, FRONTEND_URL_3, FRONTEND_URL_4],
  credentials: true
}));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));

appRouter(app);

app.use((error, req, res, next) => {
  console.log(error);

  return res.status(500).send({
    success: false,
    error: "Serverda ichki xatolik!",
  });
});

const Port = PORT || 3000;
app.listen(Port, () => {
  console.log(`Server ishga tushdi... Port:${Port}`);
});
