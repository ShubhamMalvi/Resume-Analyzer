from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/analyze", methods=["POST"])
def analyze():

    data = request.json
    resume = data["resumeText"].lower()
    job = data["jobDesc"].lower()

    resume_words = set(resume.split())
    job_words = set(job.split())

    matched = resume_words.intersection(job_words)

    score = int(len(matched) / len(job_words) * 100) if len(job_words) > 0 else 0

    feedback = "Resume matches some job keywords."

    return jsonify({
        "score": score,
        "feedback": feedback
    })

if __name__ == "__main__":
    app.run(port=8000)