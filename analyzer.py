import re
import nltk
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nltk.download('stopwords')
from nltk.corpus import stopwords

STOPWORDS = set(stopwords.words('english'))

def clean_text(text):
    text = text.lower()
    text = re.sub(r'[^a-zA-Z ]', '', text)
    words = text.split()
    words = [word for word in words if word not in STOPWORDS]
    return " ".join(words)

def analyze_resume(resume_text, job_desc):

    resume_text = clean_text(resume_text)
    job_desc = clean_text(job_desc)

    documents = [resume_text, job_desc]

    tfidf = TfidfVectorizer()
    tfidf_matrix = tfidf.fit_transform(documents)

    similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])

    score = round(float(similarity[0][0]) * 100, 2)

    # Skill Boosting (optional)
    important_skills = [
        "python", "machine learning", "data science",
        "sql", "java", "react", "node", "mongodb",
        "flask", "django"
    ]

    skill_bonus = 0
    for skill in important_skills:
        if skill in resume_text and skill in job_desc:
            skill_bonus += 2

    final_score = min(score + skill_bonus, 100)

    feedback = "Good match" if final_score > 70 else \
               "Average match" if final_score > 40 else \
               "Low match"

    return final_score