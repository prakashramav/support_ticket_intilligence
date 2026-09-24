# Support Ticket Intelligence Platform

An enterprise-grade Support Ticket Intelligence Platform that uses Machine Learning to analyze, categorize, and prioritize customer support requests automatically.

## Overview

This project consists of a FastAPI backend serving Machine Learning models (Linear SVM/Ensemble) and a modern Next.js frontend. It analyzes incoming support tickets to extract:
- **Category** (Payment, Technical, Account, etc.)
- **Priority** (High, Medium, Low)
- **Sentiment** (Positive, Neutral, Negative)
- **Key Terms** (Explainable AI detailing why the model made its decision)

## Architecture

```text
┌────────────────────┐
│      Next.js       │
│     JavaScript     │
└─────────┬──────────┘
          │ REST API
┌─────────▼──────────┐
│      FastAPI       │
│  Backend Service   │
└─────────┬──────────┘
          │
┌─────────▼──────────┐
│ Prediction Service │
└─────────┬──────────┘
          │
┌───────────────┼────────────────┐
│               │                │
▼               ▼                ▼
Category      Priority      Sentiment 
Model         Model          Model
│               │                │
└───────────────┼────────────────┘
                ▼
  Explanation / Confidence
                │
        ┌───────┴───────┐
        ▼               ▼
     Database       Analytics
```

## Features

- **Automated Ticket Classification**: Instantly categorize incoming tickets.
- **Priority Routing**: Identify urgent issues before they escalate.
- **Sentiment Analysis**: Gauge customer frustration levels.
- **Explainable AI (XAI)**: View exactly which keywords triggered the classification.
- **Analytics Dashboard**: Monitor ticket volume, sentiment trends, and model performance.
- **Historical Tracking**: Search and filter past predictions.
- **Model Registry**: View metrics and versions of deployed models.
- **Dark Mode**: Full support for system-based dark mode.

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, Tailwind CSS, Recharts, Lucide React
- **Backend**: FastAPI, Python, Uvicorn
- **Machine Learning**: Scikit-Learn, NLTK, Joblib
- **Data Visualization**: Recharts

## Setup Instructions

### Prerequisites
- Node.js 18+
- Python 3.9+
- Docker (optional)

### Backend Setup

1. Navigate to the backend directory (or root):
   ```bash
   cd backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Run the FastAPI server:
   ```bash
   uvicorn app.main:app --reload --port 8000
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables:
   Copy `.env.local.example` to `.env.local`
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Documentation

When the backend is running, you can access the automatic Swagger documentation at:
`http://localhost:8000/docs`

Key endpoints:
- `POST /api/v1/predict`: Analyze a single ticket
- `GET /api/v1/predictions/history`: Fetch past predictions
- `GET /api/v1/analytics/summary`: Fetch dashboard statistics
- `GET /api/v1/models`: List active models and metrics

## Machine Learning Details

- **Dataset**: Trained on 10,000+ anonymized customer support interactions.
- **Models**: Ensemble of Linear SVC, Random Forest, and Logistic Regression with TF-IDF vectorization.
- **Evaluation**: Macro F1 > 0.85 across all major categories.
- **XAI**: Feature importance extraction via coefficient analysis and LIME.

## Testing

### Frontend Testing
To run the React components test suite (requires Jest setup):
```bash
npm run test
```

### Backend Testing
To run the Pytest suite for API and ML models:
```bash
pytest backend/tests/
```

## Docker Deployment

To run the entire stack using Docker Compose:

```bash
docker-compose up --build -d
```

## License
MIT License
