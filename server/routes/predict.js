import express from "express";
const router = express.Router();

import { predict } from "../controllers/predict.js";

router.post("/", predict);

export default router;
