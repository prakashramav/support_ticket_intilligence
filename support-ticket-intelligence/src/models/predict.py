import os
import joblib
import pandas as pd
from src.config import MODELS_DIR

def load_model_and_encoder(target_col):
    model_path = MODELS_DIR / f"{target_col}_model.joblib"
    le_path = MODELS_DIR / f"{target_col}_label_encoder.joblib"
    
    if os.path.exists(model_path) and os.path.exists(le_path):
        model = joblib.load(model_path)
        le = joblib.load(le_path)
        return model, le
    return None, None

def predict_ticket(text):
    """
    Predict category and priority (and sentiment if available) for a given ticket text.
    """
    predictions = {}
    
    for target in ["category", "priority", "sentiment"]:
        model, le = load_model_and_encoder(target)
        if model and le:
            # Predict
            pred_enc = model.predict([text])[0]
            pred_class = le.inverse_transform([pred_enc])[0]
            
            # Try to get confidence (if model supports predict_proba)
            confidence = None
            if hasattr(model, "predict_proba"):
                try:
                    proba = model.predict_proba([text])[0]
                    confidence = float(max(proba))
                except:
                    pass
            
            predictions[target] = pred_class
            if confidence is not None:
                predictions[f"{target}_confidence"] = round(confidence, 4)
                
    return predictions

if __name__ == "__main__":
    sample_text = "Payment was deducted from my account but my order was cancelled."
    print("Input:", sample_text)
    print("Output:", predict_ticket(sample_text))
