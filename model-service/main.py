from fastapi import FastAPI, Request
from pydantic import BaseModel
from transformers import pipeline

app = FastAPI()

MODEL = "jy46604790/Fake-News-Bert-Detect"
classifier = pipeline("text-classification", model=MODEL, tokenizer=MODEL)

class TextInput(BaseModel):
    text: str

@app.post("/predict")
async def predict_news(input: TextInput):
    prediction = classifier(input.text)[0]
    return {
        "label": prediction["label"],
        "score": round(prediction["score"] * 100, 2)
    }

