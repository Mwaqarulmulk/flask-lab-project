# Main Flask app

Structure
- app.py — Flask application
- requirements.txt — dependencies
- Dockerfile — container build
- tests/ — pytest tests

Run locally (PowerShell):

```pwsh
cd main
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py
```

Run tests:

```pwsh
.\.venv\Scripts\Activate.ps1
pytest -q
```

Build and run Docker:

```pwsh
docker build -t flask-lab-project:local .
$cid = docker run -d -p 5000:5000 --name flasklab_demo flask-lab-project:local
Start-Sleep -Seconds 2
Invoke-RestMethod -Uri 'http://localhost:5000/health'
docker stop $cid
```

Submission checklist
- GitHub repo link
- Screenshot of CI/CD run
- Screenshot of app running via Docker (curl /health -> OK)
- README describing each member's role
