from flask import Flask, jsonify
from flask_cors import CORS
import datetime
import os

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/api/time")
def get_time():
    now = datetime.datetime.now().strftime("%H:%M:%S")
    return jsonify(time=now)

@app.route("/api/keys")
def get_keys():
    return jsonify(
        weather_api_key=os.getenv("WEATHER_API_KEY"),
        news_api_key=os.getenv("NEWS_API_KEY")
        )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)