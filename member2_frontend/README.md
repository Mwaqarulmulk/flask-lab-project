
Member 2 — Frontend

This folder contains a lightweight static frontend that can be used to interact with the Flask backend in `main/`.

Files added
- `index.html` — main single-page frontend
- `static/app.js` — JS that calls `/health` and POSTs JSON to `/data`
- `static/style.css` — simple styling

How to use

1. Run the Flask backend from the `main` folder (this project already has a simple Flask app):

```pwsh
# from repository root
cd .\main
python -m venv .venv          # optional: create venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

2. Open the frontend in a browser:

- If you run the Flask app above it serves templates at http://127.0.0.1:5000/ by default. You can also open `member2_frontend/index.html` directly in a browser, but CORS or same-origin restrictions will apply when calling `/data` unless you run a local static server.

Quick test

- Visit http://127.0.0.1:5000/ and use the "POST JSON to /data" form (the backend's `index.html` also contains a form). Or
- Serve the `member2_frontend` folder with Python's http.server and point its JS to the backend host if needed.

Notes

- The frontend expects the backend to provide `/health` (GET) and `/data` (POST JSON) endpoints which are present in `main/app.py`.
