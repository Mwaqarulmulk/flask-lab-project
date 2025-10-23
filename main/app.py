from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/health")
def health():
    return "OK", 200


@app.route("/data", methods=["POST"])
def data():
    if not request.is_json:
        return jsonify({"error": "expected JSON"}), 400
    payload = request.get_json()
    # echo back with a simple transformation
    return jsonify({"received": payload}), 200


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
