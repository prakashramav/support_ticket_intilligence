import os
from pathlib import Path

# Project paths
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR / "data"
RAW_DATA_DIR = DATA_DIR / "raw"
PROCESSED_DATA_DIR = DATA_DIR / "processed"
MODELS_DIR = BASE_DIR / "models"
REPORTS_DIR = BASE_DIR / "reports"

# Dataset settings
DATASET_NAME = "gorkemsevinc/customer_support_tickets"  # We might update this later
TARGET_COLS = ["category", "priority"] # We'll determine targets soon

# Model parameters
RANDOM_STATE = 42
TEST_SIZE = 0.15
VAL_SIZE = 0.15

# Text features
MAX_FEATURES = 5000
NGRAM_RANGE = (1, 2)
MIN_DF = 2
MAX_DF = 0.9
