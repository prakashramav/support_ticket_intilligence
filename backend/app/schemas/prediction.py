from pydantic import BaseModel
from typing import Optional, List, Dict

class Explanation(BaseModel):
    important_terms: List[str]

class PredictionResponse(BaseModel):
    category: Optional[str] = None
    priority: Optional[str] = None
    sentiment: Optional[str] = None
    confidence: Optional[float] = None
    explanation: Optional[Explanation] = None

class BatchPredictionResponse(BaseModel):
    predictions: List[PredictionResponse]

class ModelMetadata(BaseModel):
    name: str
    version: str

class ModelsResponse(BaseModel):
    models: List[ModelMetadata]
