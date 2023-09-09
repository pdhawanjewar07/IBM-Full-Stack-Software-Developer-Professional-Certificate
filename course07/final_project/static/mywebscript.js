// mywebscript.js

// This function is triggered when the "Run Sentiment Analysis" button is clicked
let RunSentimentAnalysis = () => {
    textToAnalyze = document.getElementById("textToAnalyze").value;

    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhttp.responseText);
            if (response.status_code == 200){
                var responseString = `For the given statement, the system response is ${JSON.stringify(response.result)}. The dominant emotion is ${response.dominant_emotion}.`;
            }
            else if (response.status_code == 400){
                var responseString = `Invalid text! Please try again!.\n${JSON.stringify(response.result)}`
            }
            document.getElementById("system_response").innerHTML = responseString;
        }
    };
    xhttp.open("GET", `emotionDetector?textToAnalyze=${encodeURIComponent(textToAnalyze)}`, true);
    xhttp.send();
};
