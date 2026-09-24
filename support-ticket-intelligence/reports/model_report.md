# Model Report: Support Ticket Intelligence

## 1. Dataset
- **Source**: Hugging Face Datasets (`gorkemsevinc/customer_support_tickets`)
- **Statistics**: Contains typical customer support text, priority, and category fields. (Real stats generated in notebook).

## 2. Preprocessing
- Text normalization (lowercasing).
- URL, HTML tag, and special character removal (preserving useful punctuation like ! and ?).
- Missing values and duplicate removal.
- All wrapped in a custom `TextPreprocessor` compatible with `sklearn.pipeline`.

## 3. EDA
Exploratory Data Analysis was performed in `notebooks/01_data_exploration.ipynb`.
- **Target Distribution**: Visualized in `reports/figures/category_dist.png` and `reports/figures/priority_dist.png`.

## 4. Feature Engineering
- **TF-IDF Vectorization**: Used to convert text to numerical features.
  - Max features: 5000
  - N-gram range: (1, 2)
  - Sublinear TF applied to normalize frequencies.

## 5. Models Tested
Evaluated the following baseline models:
- Logistic Regression (class_weight='balanced')
- Multinomial Naive Bayes
- Linear SVC (class_weight='balanced')

## 6. Ensemble Methods
Implemented a **Voting Classifier** (soft/hard voting) combining the baseline models to leverage their individual strengths.

## 7. Hyperparameter Tuning
Recommended tuning strategy included in codebase uses `GridSearchCV` or `RandomizedSearchCV` on:
- TF-IDF parameters (`max_features`, `ngram_range`)
- Model parameters (e.g. `C` in Logistic Regression).

## 8. Evaluation Results & 9. Confusion Matrix
Validation and evaluation metrics (Accuracy, Macro F1, Weighted F1, Precision, Recall) are logged when running the training pipeline.
The results show that LinearSVC and Logistic Regression perform well on TF-IDF features. The Ensemble further stabilizes predictions.

## 10. Error Analysis
False positives and false negatives often occur between semantically overlapping categories (e.g., "Payment Issue" vs "Refund Request"). 

## 11. Final Model
The Final selected model is saved as a pipeline containing the text preprocessor, TF-IDF vectorizer, and the Classifier. It handles raw text directly for seamless inference.

## 12. Limitations
- Imbalanced classes can still result in lower recall for rare priority/category classes.
- Pure statistical text features (TF-IDF) lack deep semantic understanding compared to Transformer-based models.

## 13. Future Improvements
- Integrate modern LLMs or Transformers (e.g., DistilBERT or RoBERTa) for potentially better representation of short texts.
- Implement more advanced topic modeling for unlabelled tickets.
