import express from "express";
import { PORT } from "./config/config.js";
import cors from "cors";
import { appRouter } from "./router/router.js";

const app = express();

app.use(cors({
  origin: ['http://localhost:5173', 'https://dashboard.atr.uz'],
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

appRouter(app);

app.use((error, req, res, next) => {
  console.log(error);

  return res.status(500).send({
    error: "Serverda ichki xatolik!",
  });
});

const Port = PORT || 3000;
app.listen(Port, () => {
  console.log(`Server ishga tushdi... Port:${Port}`);
});
