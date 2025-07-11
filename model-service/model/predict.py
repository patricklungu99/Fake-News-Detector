# model/predict.py
import joblib

model = joblib.load("model/model.joblib")

def predict(text):
    result = model.predict_proba([text])[0]
    label = "FAKE" if result[1] > 0.5 else "REAL"
    return {"label": label, "confidence": round(max(result), 2)}
