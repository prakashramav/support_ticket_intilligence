import numpy as np
from typing import Dict, Any, List
from app.services.model_service import model_service
from app.schemas.prediction import PredictionResponse, Explanation
from app.schemas.ticket import TicketRequest
import logging

logger = logging.getLogger(__name__)

class PredictionService:
    @staticmethod
    def _extract_explanation(model, tfidf_vectorizer, text: str) -> Explanation:
        """
        Extracts important terms using the TF-IDF vectorizer and model coefficients if available.
        For simplicity, we'll just extract the top TF-IDF words for this specific text.
        """
        try:
            # Transform text
            tfidf_matrix = tfidf_vectorizer.transform([text])
            feature_names = tfidf_vectorizer.get_feature_names_out()
            
            # Get non-zero elements
            nonzero_indices = tfidf_matrix.nonzero()[1]
            if len(nonzero_indices) == 0:
                return Explanation(important_terms=[])
            
            # Sort by TF-IDF score
            scores = [(idx, tfidf_matrix[0, idx]) for idx in nonzero_indices]
            scores.sort(key=lambda x: x[1], reverse=True)
            
            # Take top 5 terms
            top_terms = [feature_names[idx] for idx, score in scores[:5]]
            return Explanation(important_terms=top_terms)
        except Exception as e:
            logger.warning(f"Failed to generate explanation: {e}")
            return Explanation(important_terms=[])

    @staticmethod
    def predict_ticket(ticket: TicketRequest) -> PredictionResponse:
        response_data = {}
        
        # Track confidence across targets to compute an overall confidence or just take the min/avg
        confidences = []
        explanation_generated = False
        
        for target in model_service.targets:
            model, le = model_service.get_model_and_encoder(target)
            if model and le:
                try:
                    # Model prediction (model is a pipeline containing preprocessor, tfidf, classifier)
                    pred_enc = model.predict([ticket.text])[0]
                    pred_class = le.inverse_transform([pred_enc])[0]
                    response_data[target] = pred_class
                    
                    # Confidence
                    if hasattr(model, "predict_proba"):
                        proba = model.predict_proba([ticket.text])[0]
                        confidence = float(max(proba))
                        confidences.append(confidence)
                    
                    # Explanation (only need to generate once)
                    if not explanation_generated:
                        # Extract the tfidf step from pipeline if it exists
                        if hasattr(model, "named_steps") and "tfidf" in model.named_steps:
                            tfidf_step = model.named_steps["tfidf"]
                            response_data["explanation"] = PredictionService._extract_explanation(
                                model.named_steps["classifier"], 
                                tfidf_step, 
                                ticket.text
                            )
                            explanation_generated = True
                except Exception as e:
                    logger.error(f"Error predicting {target}: {e}")
        
        if confidences:
            # We can return the average confidence or the category confidence
            # Let's return average for simplicity, or if we want we can make it a dict.
            response_data["confidence"] = round(sum(confidences) / len(confidences), 4)
            
        return PredictionResponse(**response_data)

    @staticmethod
    def predict_batch(tickets: List[TicketRequest]) -> List[PredictionResponse]:
        # For a truly optimized batch prediction, we would pass all texts at once to model.predict(texts)
        # But to keep explanation extraction simple per ticket, we can iterate, 
        # or implement a vectorized approach. For now, iteration is clean.
        return [PredictionService.predict_ticket(t) for t in tickets]
