# 📰 Fake News Detector 🔍  
*An AI-powered web application that detects whether a news article or URL is real or fake*

## 🔍 Overview
A hybrid full-stack application using:
- Next.js (Frontend)
- Express.js (API Bridge)  
- FastAPI (Model Server)
- NLP/ML models (BERT/TF-IDF + Naive Bayes)

## ✨ Features
| Feature | Description |
|---------|-------------|
| 🧠 Real-time Analysis | Instant fake news detection using NLP models |
| 🌐 Multiple Inputs | Accepts both text content and URLs (with web scraping) |
| 📊 Confidence Metrics | Shows prediction certainty percentage |
| 🛠️ Modular Design | Separated frontend, API, and model services |
| 🔍 Explainability | (Coming Soon) SHAP/LIME model explanations |

## 🛠️ Tech Stack
**Frontend**:  
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs)  
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react)  
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript)  

**Backend**:  
![Express.js](https://img.shields.io/badge/Express.js-000000?style=flat&logo=express)  
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi)  

**ML**:  
![Scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikitlearn)  
![Transformers](https://img.shields.io/badge/HuggingFace-FFD21E?style=flat&logo=huggingface)  

## 🚀 Installation
# Clone repository
git clone https://github.com/yourusername/fake-news-detector.git
cd fake-news-detector

# Model Service (FastAPI)
```bash
cd model-service
python -m venv venv
source venv/bin/activate  # Linux/Mac
# venv\Scripts\activate   # Windows
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

# API Bridge (Express.js)
```bash
cd backend
npm install
npm run dev
```

# Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
Access the app at: http://localhost:3000
```

## 📂 Project Structure
```text
fake-news-detector/
├── frontend/          # Next.js app (pages, components)
│   ├── public/
│   ├── src/
│   └── package.json
├── backend/           # Express API
│   ├── routes/
│   └── server.js
├── model-service/     # FastAPI
│   ├── models/
│   └── main.py
└── README.md
```
## 🤝 How to Contribute
```bash
Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add amazing feature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
```

📜 License
Distributed under the MIT License. See LICENSE for more information.

📬 Contact

Patrick Lungu - patricklungu99@gmail.com

Project Link: https://github.com/patricklungu99/fake-news-detector
