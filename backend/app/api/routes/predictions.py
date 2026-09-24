from fastapi import APIRouter, HTTPException
from app.schemas.ticket import TicketRequest, BatchTicketRequest
from app.schemas.prediction import PredictionResponse, BatchPredictionResponse, ModelsResponse
from app.services.prediction_service import PredictionService
from app.services.model_service import model_service
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

@router.post("/predict", response_model=PredictionResponse)
async def predict(ticket: TicketRequest):
    try:
        return PredictionService.predict_ticket(ticket)
    except Exception as e:
        logger.error(f"Prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during prediction")

@router.post("/predict/batch", response_model=BatchPredictionResponse)
async def predict_batch(request: BatchTicketRequest):
    try:
        predictions = PredictionService.predict_batch(request.tickets)
        return BatchPredictionResponse(predictions=predictions)
    except Exception as e:
        logger.error(f"Batch prediction failed: {e}")
        raise HTTPException(status_code=500, detail="Internal server error during batch prediction")

@router.get("/models", response_model=ModelsResponse)
async def get_models():
    return ModelsResponse(models=model_service.get_loaded_models_metadata())
