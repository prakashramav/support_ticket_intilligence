import os
import joblib
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.naive_bayes import MultinomialNB
from sklearn.svm import LinearSVC
from sklearn.ensemble import RandomForestClassifier, VotingClassifier, StackingClassifier
from xgboost import XGBClassifier
from sklearn.preprocessing import LabelEncoder
import json

from src.config import PROCESSED_DATA_DIR, MODELS_DIR, RANDOM_STATE, TEST_SIZE, VAL_SIZE
from src.data.preprocessing import TextPreprocessor
from src.features.feature_engineering import get_tfidf_vectorizer

def train_and_save_model(df, target_col, text_col="text"):
    # Split the dataset: 70% train, 15% val, 15% test
    # First split into train and temp (30%)
    X_train, X_temp, y_train, y_temp = train_test_split(
        df[text_col], df[target_col], 
        test_size=(TEST_SIZE + VAL_SIZE), 
        random_state=RANDOM_STATE, 
        stratify=df[target_col]
    )
    
    # Then split temp into val and test (50% of 30% = 15%)
    X_val, X_test, y_val, y_test = train_test_split(
        X_temp, y_temp, 
        test_size=0.5, 
        random_state=RANDOM_STATE, 
        stratify=y_temp
    )
    
    # Label encoding for target
    le = LabelEncoder()
    y_train_enc = le.fit_transform(y_train)
    y_val_enc = le.transform(y_val)
    y_test_enc = le.transform(y_test)
    
    # We will try a few models and select the best based on simple validation (or just train a Voting one for simplicity here, more complex comparison in notebook)
    
    print(f"Training models for {target_col}...")
    
    # Define models
    lr = LogisticRegression(class_weight='balanced', random_state=RANDOM_STATE, max_iter=1000)
    svm = LinearSVC(class_weight='balanced', random_state=RANDOM_STATE)
    nb = MultinomialNB()
    
    # Let's create an ensemble - Voting (soft voting requires probabilities, LinearSVC doesn't provide them easily by default, so we use hard or switch to SVC(probability=True))
    # We will use Logistic Regression as the final model for simplicity in this script, but in evaluation we explore more.
    # Actually, the requirement asks for Ensemble Learning to be demonstrated. We will build a Stacking or Voting pipeline.
    
    estimators = [
        ('lr', lr),
        ('nb', nb)
    ]
    ensemble = VotingClassifier(estimators=estimators, voting='soft')
    
    # Create Pipeline
    pipeline = Pipeline([
        ('preprocessor', TextPreprocessor()),
        ('tfidf', get_tfidf_vectorizer()),
        ('classifier', ensemble)
    ])
    
    print("Fitting pipeline...")
    pipeline.fit(X_train, y_train_enc)
    
    val_acc = pipeline.score(X_val, y_val_enc)
    print(f"Validation Accuracy for {target_col}: {val_acc:.4f}")
    
    # Save the pipeline and label encoder
    os.makedirs(MODELS_DIR, exist_ok=True)
    model_path = MODELS_DIR / f"{target_col}_model.joblib"
    le_path = MODELS_DIR / f"{target_col}_label_encoder.joblib"
    
    joblib.dump(pipeline, model_path)
    joblib.dump(le, le_path)
    print(f"Saved {target_col} model and label encoder.")
    
    return pipeline, le, X_test, y_test_enc

if __name__ == "__main__":
    df_path = PROCESSED_DATA_DIR / "cleaned_tickets.csv"
    if not os.path.exists(df_path):
        print(f"Data not found at {df_path}. Run preprocessing first.")
    else:
        df = pd.read_csv(df_path)
        # Train for available targets. Let's assume 'category' and 'priority' for now.
        for target in ["category", "priority"]:
            if target in df.columns:
                train_and_save_model(df, target)
