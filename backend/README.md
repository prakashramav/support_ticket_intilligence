# Support Ticket Intelligence - FastAPI Backend

This is the backend service for the Support Ticket Intelligence system. It exposes the machine learning models created in Part 1 as a REST API.

## Project Structure
- `app/api`: FastAPI routes.
- `app/schemas`: Pydantic models for request/response validation.
- `app/services`: Business logic and ML model inference.
- `app/core`: Configuration settings.
- `tests`: Pytest suite.

## Setup & Installation
1. Create a virtual environment and activate it:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\Activate.ps1
   ```
2. Install requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Environment variables:
   Copy `.env.example` to `.env` and adjust settings as needed.
   ```bash
   cp .env.example .env
   ```

## Running Locally
Start the FastAPI server using Uvicorn:
```bash
uvicorn app.main:app --reload
```
The server will be available at `http://localhost:8000`.

## API Documentation
Once running, you can access the interactive API docs at:
- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## API Endpoints

### Health Check
```http
GET /api/v1/health
```
**Response**:
```json
{
  "status": "healthy"
}
```

### Predict Single Ticket
```http
POST /api/v1/predict
```
**Request**:
```json
{
  "text": "My payment failed but money was deducted"
}
```
**Response**:
```json
{
  "category": "Payment Issue",
  "priority": "High",
  "sentiment": "Negative",
  "confidence": 0.91,
  "explanation": {
    "important_terms": ["payment", "deducted", "failed"]
  }
}
```

### Batch Prediction
```http
POST /api/v1/predict/batch
```
**Request**:
```json
{
  "tickets": [
    {"text": "First ticket text"},
    {"text": "Second ticket text"}
  ]
}
```

## Testing
Run the test suite using pytest:
```bash
pytest
```

## Docker Usage
Build and run the Docker container:
```bash
docker build -t support-ticket-api .
docker run -p 8000:8000 --env-file .env support-ticket-api
```
