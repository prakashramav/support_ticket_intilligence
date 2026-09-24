import pandas as pd
import numpy as np
import re
from sklearn.base import BaseEstimator, TransformerMixin

class TextPreprocessor(BaseEstimator, TransformerMixin):
    def __init__(self, text_col='text'):
        self.text_col = text_col

    def fit(self, X, y=None):
        return self

    def transform(self, X):
        X_copy = X.copy()
        if isinstance(X_copy, pd.Series):
            X_copy = X_copy.apply(self._clean_text)
        elif isinstance(X_copy, pd.DataFrame):
            X_copy[self.text_col] = X_copy[self.text_col].apply(self._clean_text)
        elif isinstance(X_copy, list):
            X_copy = [self._clean_text(t) for t in X_copy]
        return X_copy
    
    def _clean_text(self, text):
        if not isinstance(text, str):
            return ""
        
        # Lowercase
        text = text.lower()
        
        # Remove URLs
        text = re.sub(r'http\S+', '', text)
        text = re.sub(r'www\.\S+', '', text)
        
        # Remove HTML tags
        text = re.sub(r'<.*?>', '', text)
        
        # Remove special characters but keep some punctuation (like ! and ?) which might indicate sentiment
        # We replace them with spaces to avoid joining words
        text = re.sub(r'[^a-zA-Z0-9\s!?.,]', ' ', text)
        
        # Normalize whitespace
        text = re.sub(r'\s+', ' ', text).strip()
        
        return text

def clean_dataset(df):
    """
    General dataset cleaning: duplicates, missing values.
    """
    # Drop duplicates
    df = df.drop_duplicates()
    
    # Fill missing values for text
    df = df.fillna("")
    
    return df
