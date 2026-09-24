from fastapi.testclient import TestClient
from app.main import app
import pytest

client = TestClient(app)

def test_health():
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    assert response.json() == {"status": "healthy"}

def test_valid_prediction():
    response = client.post("/api/v1/predict", json={"text": "I was charged twice for the same order"})
    assert response.status_code == 200
    data = response.json()
    assert "category" in data
    assert "priority" in data

def test_empty_ticket():
    response = client.post("/api/v1/predict", json={"text": ""})
    assert response.status_code == 422
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "INVALID_INPUT"

def test_invalid_request():
    response = client.post("/api/v1/predict", json={"wrong_field": "text"})
    assert response.status_code == 422
    data = response.json()
    assert data["error"]["code"] == "INVALID_INPUT"

def test_batch_prediction():
    response = client.post("/api/v1/predict/batch", json={
        "tickets": [
            {"text": "First ticket text that is long enough"},
            {"text": "Second ticket text that is long enough"}
        ]
    })
    assert response.status_code == 200
    data = response.json()
    assert "predictions" in data
    assert len(data["predictions"]) == 2

def test_models_loading():
    response = client.get("/api/v1/models")
    assert response.status_code == 200
    data = response.json()
    assert "models" in data
