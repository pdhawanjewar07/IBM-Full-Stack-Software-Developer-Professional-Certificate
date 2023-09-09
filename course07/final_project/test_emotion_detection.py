from EmotionDetection.emotion_detection import emotion_predictor
import unittest

def test_function(text):
    dominant_emotion = emotion_predictor(text)['dominant_emotion']
    return dominant_emotion

class TestEmotionAnalyzer(unittest.TestCase):
    def test_emotion_analyzer(self):
        result_1 = test_function('I am glad this happened')
        self.assertEqual(result_1, 'joy')
        result_2 = test_function('I am really mad about this')
        self.assertEqual(result_2, 'anger')
        result_3 = test_function('I feel disgusted just hearing about this')
        self.assertEqual(result_3, 'disgust')
        result_4 = test_function('I am so sad about this')
        self.assertEqual(result_4, 'sadness')
        result_5 = test_function('I am really afraid that this will happen')
        self.assertEqual(result_5, 'fear')

unittest.main()
