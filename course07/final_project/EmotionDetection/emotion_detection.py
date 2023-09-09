import requests
import json

# def emotion_detector(text_to_analyze):
#     url = 'https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict'
#     myobj = { "raw_document": { "text": text_to_analyze } }
#     header = {"grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"}
#     response = requests.post(url, json = myobj, headers=header)
#     return response.text

def emotion_predictor(text_to_analyze):
    url = 'https://sn-watson-emotion.labs.skills.network/v1/watson.runtime.nlp.v1/NlpService/EmotionPredict'
    myobj = { "raw_document": { "text": text_to_analyze } }
    header = {"grpc-metadata-mm-model-id": "emotion_aggregated-workflow_lang_en_stock"}
    response = requests.post(url, json = myobj, headers=header)

    e_dict = json.loads(response.text)
    emotion_scores = e_dict["emotionPredictions"][0]["emotion"]

    anger_score = emotion_scores["anger"]
    disgust_score = emotion_scores["disgust"]
    fear_score = emotion_scores["fear"]
    joy_score = emotion_scores["joy"]
    sadness_score = emotion_scores["sadness"]
    dominant_emotion = max(emotion_scores, key=emotion_scores.get)

    return {
            'anger': anger_score,
            'disgust': disgust_score,
            'fear': fear_score,
            'joy': joy_score,
            'sadness': sadness_score,
            'dominant_emotion': dominant_emotion
            }

# print(emotion_predictor('I hurt my leg today but also got a promotion'))