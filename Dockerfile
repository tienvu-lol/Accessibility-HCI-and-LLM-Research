# Fallback so Railway auto-detects a Dockerfile at the repo root instead of Railpack guessing a Python app.
# Keep byte-identical to deploy/railway/Dockerfile.demo after this header (checked by tests/deploy).
# Build context: REPOSITORY ROOT.  docker build -f deploy/railway/Dockerfile.demo -t demo-report .
# Contains only the frozen, explicitly exported demo report. No model calls, no secrets, no runs/ directory.
FROM python:3.11-slim

ENV PYTHONUNBUFFERED=1 PYTHONDONTWRITEBYTECODE=1
RUN useradd --system --uid 10001 --no-create-home app
WORKDIR /app
COPY deploy/railway/server.py /app/server.py
COPY deploy/railway/demo-report/ /app/demo-report/
ENV REPORT_DIR=/app/demo-report
USER app
EXPOSE 8080
# Railway injects PORT; server binds 0.0.0.0:$PORT (falls back to 8080).
CMD ["python", "/app/server.py"]
