from flask import Flask, jsonify
from flask_cors import CORS  # Dodaj import
import datetime

app = Flask(__name__)
CORS(app)  # Włącz CORS

@app.route("/api/time")
def get_time():
    now = datetime.datetime.now().strftime("%H:%M:%S")
    return jsonify(time=now)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)