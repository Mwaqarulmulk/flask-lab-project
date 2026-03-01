# Flask Lab Project 🚀

A simple collaborative Flask web app built as a class exercise. Three team members each own a piece — backend, frontend, and DevOps — and everything is wired together with Docker and GitHub Actions.

---

## What it does

- Serves a small web page at `/`
- Exposes a `/health` endpoint (returns `OK`) — handy for container health checks
- Accepts JSON payloads via `POST /data` and echoes them back with a simple transformation
- Ships with a lightweight static frontend you can open in the browser

---

## Project layout

```
flask-lab-project/
├── main/                  # Core Flask app (backend)
│   ├── app.py             # Routes: /, /health, /data
│   ├── templates/         # Jinja2 HTML template
│   ├── static/            # CSS
│   ├── tests/             # pytest tests
│   ├── requirements.txt
│   └── Dockerfile
├── member2_frontend/      # Static frontend (HTML + JS + CSS)
├── member3_devops/        # DevOps notes
└── .github/workflows/     # CI/CD pipeline
```

---

## Getting started

**Run locally** (from the `main/` folder):

```bash
cd main
python -m venv .venv
source .venv/bin/activate          # PowerShell (Windows): .\.venv\Scripts\Activate.ps1
                                   # CMD (Windows):        .venv\Scripts\activate.bat
pip install -r requirements.txt
python app.py
```

Then open http://localhost:5000 in your browser.

**Run tests:**

```bash
cd main
pytest -q
```

**Run with Docker:**

```bash
cd main
docker build -t flask-lab-project:local .
docker run -d -p 5000:5000 --name flasklab flask-lab-project:local
curl http://localhost:5000/health   # should print: OK
```

---

## API

| Method | Path      | Description                        |
|--------|-----------|------------------------------------|
| GET    | `/`       | Home page                          |
| GET    | `/health` | Returns `OK` — for health checks   |
| POST   | `/data`   | Accepts JSON, echoes it back       |

**Example:**

```bash
curl -X POST http://localhost:5000/data \
     -H "Content-Type: application/json" \
     -d '{"message": "hello"}'
# {"received": {"message": "hello"}}
```

---

## Team

| Role     | Folder              | Responsibilities                                   |
|----------|---------------------|----------------------------------------------------|
| Backend  | `main/`             | Flask routes, unit tests                           |
| Frontend | `member2_frontend/` | Static HTML/JS/CSS that talks to the backend       |
| DevOps   | `member3_devops/`   | Dockerfile, CI/CD pipeline, container registry     |

---

## CI/CD

A GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs on every push to `main`. It checks out the repo and runs a smoke test to confirm the pipeline is alive.

---

## Tech stack

- **Python 3.11** + **Flask 2.2**
- **pytest** for testing
- **Docker** (python:3.11-slim base image, non-root user)
- **GitHub Actions** for CI/CD

