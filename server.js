import express from "express"
import { PORT } from './config/config.js'
import cors from 'cors'

const app = express()

app.use(cors())

const Port = PORT || 3000

app.listen(Port, () => {
    console.log(`Server ishga tushdi... Port:${Port}`);
})