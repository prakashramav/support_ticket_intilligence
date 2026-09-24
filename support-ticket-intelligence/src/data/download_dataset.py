import os
import pandas as pd
from datasets import load_dataset
from src.config import RAW_DATA_DIR, DATASET_NAME, TARGET_COLS

def download_and_save_data():
    print(f"Downloading dataset {DATASET_NAME}...")
    try:
        ds = load_dataset(DATASET_NAME, split="train")
        df = ds.to_pandas()
        
        # Save to raw directory
        os.makedirs(RAW_DATA_DIR, exist_ok=True)
        raw_path = RAW_DATA_DIR / "tickets.csv"
        df.to_csv(raw_path, index=False)
        print(f"Saved raw dataset to {raw_path}")
        
        # Display dataset info
        print("\n--- Dataset Info ---")
        print(f"Shape: {df.shape}")
        print(f"Columns: {df.columns.tolist()}")
        print("\nSample Rows:")
        print(df.head(2).to_string())
        
        return df
        
    except Exception as e:
        print(f"Error downloading dataset: {e}")
        return None

if __name__ == "__main__":
    download_and_save_data()
