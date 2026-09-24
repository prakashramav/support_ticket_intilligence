# Support Ticket Intelligence System (Part 1)

This project builds the Machine Learning pipeline for a production-style Support Ticket Intelligence System. The system analyzes customer support tickets and predicts:
- Category
- Priority
- Sentiment (if available)

## Project Structure
```
support-ticket-intelligence/
├── data/
│   ├── raw/
│   └── processed/
├── notebooks/
│   ├── 01_data_exploration.ipynb
│   ├── 02_preprocessing.ipynb
│   └── 03_model_experiments.ipynb
├── src/
│   ├── data/
│   │   ├── download_dataset.py
│   │   ├── preprocessing.py
│   │   └── validation.py
│   ├── features/
│   │   └── feature_engineering.py
│   ├── models/
│   │   ├── train.py
│   │   ├── evaluate.py
│   │   └── predict.py
│   └── config.py
├── models/
├── reports/
│   ├── figures/
│   └── model_report.md
├── requirements.txt
└── README.md
```

## Dataset
We use a publicly available customer support ticket dataset from Hugging Face Hub (`gorkemsevinc/customer_support_tickets` or similar).

## Concepts Explained
- **Bagging**: Bootstrap Aggregating. Trains multiple models (usually of the same type, like decision trees) on random subsets of the data with replacement, and averages their predictions. (e.g., Random Forest)
- **Boosting**: Trains models sequentially, where each new model tries to correct the errors of the previous ones. (e.g., XGBoost, LightGBM)
- **Voting**: An ensemble method that trains multiple independent models (often different algorithms like Logistic Regression, SVM, Naive Bayes) and averages their predictions (soft voting) or takes the majority vote (hard voting).
- **Stacking**: An ensemble method where multiple base models are trained, and their predictions are used as features to train a "meta-model" that makes the final prediction.

## Instructions
1. Setup virtual environment and install requirements:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   ```
2. Download data: `python src/data/download_dataset.py`
3. Train model: `python src/models/train.py`
4. Predict: `python src/models/predict.py`
