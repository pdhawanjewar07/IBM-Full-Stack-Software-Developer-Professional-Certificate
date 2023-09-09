"""
Emotion Analyzer Web Application
"""

from flask import Flask, render_template, request, jsonify
from EmotionDetection.emotion_detection import emotion_predictor

app = Flask(__name__)

@app.route("/emotionDetector")
def emot_analyzer():
    """
    Analyzes the emotions present in the input text and returns the results.

    Returns:
        JSON response containing emotion analysis results and status code.
    """
    text_to_analyze = request.args.get('textToAnalyze')
    selected_keys = ["anger", "disgust", "fear", "joy", "sadness"]
    if text_to_analyze is None or not text_to_analyze.strip():
        response = {key: None for key in selected_keys}
        status_code = 400  # Bad Request
    else:
        response = emotion_predictor(text_to_analyze)
        status_code = 200  # OK
    new_dict = {key: response[key] for key in selected_keys}
    return jsonify(result=new_dict,
    dominant_emotion=response.get("dominant_emotion"),
    status_code=status_code)

@app.route("/")
def render_index_page():
    """
    Renders the index HTML page.

    Returns:
        Rendered HTML template.
    """
    return render_template('index.html')

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5009)
