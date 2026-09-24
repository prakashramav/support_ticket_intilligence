import os
import joblib
import logging
from app.core.config import settings
from typing import Dict, Any, Tuple

logger = logging.getLogger(__name__)

class ModelService:
    def __init__(self):
        self.models: Dict[str, Any] = {}
        self.encoders: Dict[str, Any] = {}
        self.targets = ["category", "priority", "sentiment"]
        
        import sys
        ml_path = str(settings.BASE_DIR.parent / "support-ticket-intelligence")
        if ml_path not in sys.path:
            sys.path.append(ml_path)
            
        self._load_models()

    def _load_models(self):
        # Support both a local models folder and the Part 1 folder
        paths_to_check = [
            settings.MODELS_DIR,
            settings.BASE_DIR.parent / "support-ticket-intelligence" / "models"
        ]
        
        models_loaded = False
        
        for base_path in paths_to_check:
            if not base_path.exists():
                continue
                
            for target in self.targets:
                model_path = base_path / f"{target}_model.joblib"
                encoder_path = base_path / f"{target}_label_encoder.joblib"
                
                if model_path.exists() and encoder_path.exists():
                    try:
                        self.models[target] = joblib.load(model_path)
                        self.encoders[target] = joblib.load(encoder_path)
                        logger.info(f"Loaded {target} model from {base_path}")
                        models_loaded = True
                    except Exception as e:
                        logger.error(f"Error loading {target} model: {e}")
            
            if models_loaded:
                break
                
        if not models_loaded:
            logger.warning("No models found. Prediction endpoints will return None for model outputs.")

    def get_model_and_encoder(self, target: str) -> Tuple[Any, Any]:
        return self.models.get(target), self.encoders.get(target)
        
    def get_loaded_models_metadata(self) -> list:
        return [{"name": f"ticket-{target}", "version": "1.0"} for target in self.models.keys()]

model_service = ModelService()
