import pandas as pd
import numpy as np
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix, classification_report
import joblib
from src.config import MODELS_DIR

def evaluate_model(target_col, X_test, y_test_enc, model, le):
    """
    Evaluates the model on test set.
    """
    print(f"\n--- Evaluation for {target_col} ---")
    y_pred = model.predict(X_test)
    
    acc = accuracy_score(y_test_enc, y_pred)
    prec_macro = precision_score(y_test_enc, y_pred, average='macro', zero_division=0)
    rec_macro = recall_score(y_test_enc, y_pred, average='macro', zero_division=0)
    f1_macro = f1_score(y_test_enc, y_pred, average='macro', zero_division=0)
    f1_weighted = f1_score(y_test_enc, y_pred, average='weighted', zero_division=0)
    
    print(f"Accuracy: {acc:.4f}")
    print(f"Macro Precision: {prec_macro:.4f}")
    print(f"Macro Recall: {rec_macro:.4f}")
    print(f"Macro F1: {f1_macro:.4f}")
    print(f"Weighted F1: {f1_weighted:.4f}")
    
    print("\nClassification Report:")
    target_names = [str(c) for c in le.classes_]
    print(classification_report(y_test_enc, y_pred, target_names=target_names, zero_division=0))
    
    print("Confusion Matrix:")
    print(confusion_matrix(y_test_enc, y_pred))
    
    return {
        "accuracy": acc,
        "macro_f1": f1_macro,
        "weighted_f1": f1_weighted
    }
