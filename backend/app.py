from flask import Flask, jsonify
from flask_cors import CORS
import datetime
# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv()
# Ensure that the .env file is in the same directory as this script or provide the path to it
import os.path
import requests
import xml.etree.ElementTree as ET

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route("/api/time")
def get_time():
    now = datetime.datetime.now().strftime("%H:%M:%S")
    date = datetime.datetime.now().strftime("%A,%d %B %Y")
    return jsonify(
        hour=f"{now.hour:02d}",
        minute=f"{now.minute:02d}",
        second=f"{now.second:02d}"
    )


@app.route("/api/nyt")
def get_nyt_news():
    rss_url = "https://rss.nytimes.com/services/xml/rss/nyt/Europe.xml"
    resp = requests.get(rss_url)
    root = ET.fromstring(resp.content)
    items = []
    for item in root.findall(".//item"):
        title = item.find("title").text
        items.append({"title": title})
    return jsonify(articles=items)

@app.route("/api/keys")
def get_keys():
    return jsonify(
        weather_api_key=os.getenv("WEATHER_API_KEY"),
#        news_api_key=os.getenv("NEWS_API_KEY")
        )

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)