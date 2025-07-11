import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";

import predictRoute from "./routes/predict.js";

dotenv.config();
const app = express()
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/api/predict', predictRoute);

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
