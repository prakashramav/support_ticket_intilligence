import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from src.config import MAX_FEATURES, NGRAM_RANGE, MIN_DF, MAX_DF

def get_tfidf_vectorizer():
    return TfidfVectorizer(
        max_features=MAX_FEATURES,
        ngram_range=NGRAM_RANGE,
        min_df=MIN_DF,
        max_df=MAX_DF,
        sublinear_tf=True
    )
