FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install build deps and cleanup to keep image small
RUN apt-get update && apt-get install -y --no-install-recommends \
		ca-certificates \
		wget \
		&& rm -rf /var/lib/apt/lists/*

COPY requirements.txt /app/requirements.txt
RUN python -m pip install --upgrade pip && \
		pip install --no-cache-dir -r /app/requirements.txt

# Copy app
COPY . /app

# Create non-root user
RUN useradd -m appuser && chown -R appuser:appuser /app

USER appuser

EXPOSE 5000

# Healthcheck using Python stdlib
HEALTHCHECK --interval=10s --timeout=3s --start-period=5s --retries=3 \
	CMD python -c "import urllib.request,sys; r=urllib.request.urlopen('http://127.0.0.1:5000/health'); data=r.read(); sys.exit(0 if b'OK' in data else 1)"

CMD ["python", "app.py"]
