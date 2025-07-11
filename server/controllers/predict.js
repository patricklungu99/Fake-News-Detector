import express from "express";
import axios from "axios";

const FASTAPI_URL = 'http://localhost:8000';

export const predict = async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Missing text input" });
  }

  try {
    const response = await axios.post(`${FASTAPI_URL}/predict`, { text });
    res.json(response.data);
  } catch (err) {
    console.error("FastAPI error:", err.message);
    res.status(500).json({ error: "Internal server error calling ML service" });
  }
}
