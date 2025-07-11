# model/train.py
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
import joblib

# Dummy data (replace with real dataset later)
texts = [
    "The moon landing was staged",
    "COVID vaccines cause magnetism",
    "NASA confirms new planet",
    "Elon Musk launches new Starship"
]
labels = [1, 1, 0, 0]  # 1 = Fake, 0 = Real

# Create pipeline
model = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

model.fit(texts, labels)
joblib.dump(model, 'model/model.joblib')
