import express from "express";
import { PORT } from "./config/config.js";
import cors from "cors";

const app = express();

app.use(cors());

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