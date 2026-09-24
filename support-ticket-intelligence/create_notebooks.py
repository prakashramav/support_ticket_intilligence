import nbformat as nbf
import os

def create_notebook(filename, cells_content):
    nb = nbf.v4.new_notebook()
    cells = []
    for c_type, content in cells_content:
        if c_type == 'md':
            cells.append(nbf.v4.new_markdown_cell(content))
        else:
            cells.append(nbf.v4.new_code_cell(content))
    nb['cells'] = cells
    
    with open(filename, 'w', encoding='utf-8') as f:
        nbf.write(nb, f)

os.makedirs('notebooks', exist_ok=True)

# 01_data_exploration.ipynb
cells_01 = [
    ('md', '# Data Exploration\nLet\'s explore the support tickets dataset.'),
    ('code', 'import pandas as pd\nimport matplotlib.pyplot as plt\nimport seaborn as sns\nimport os\n\ndf = pd.read_csv("../data/raw/tickets.csv")\ndf.head()'),
    ('code', 'print(f"Shape: {df.shape}")\nprint(df.info())\nprint(df.isnull().sum())'),
    ('code', 'plt.figure(figsize=(10, 5))\nsns.countplot(data=df, y="category")\nplt.title("Category Distribution")\nplt.tight_layout()\nplt.savefig("../reports/figures/category_dist.png")\nplt.show()'),
    ('code', 'if "priority" in df.columns:\n    plt.figure(figsize=(8, 4))\n    sns.countplot(data=df, x="priority")\n    plt.title("Priority Distribution")\n    plt.savefig("../reports/figures/priority_dist.png")\n    plt.show()')
]
create_notebook('notebooks/01_data_exploration.ipynb', cells_01)

# 02_preprocessing.ipynb
cells_02 = [
    ('md', '# Preprocessing\nClean the text data and prepare it for feature engineering.'),
    ('code', 'import pandas as pd\nimport sys\nsys.path.append("..")\nfrom src.data.preprocessing import clean_dataset, TextPreprocessor\n\ndf = pd.read_csv("../data/raw/tickets.csv")\nprint("Original shape:", df.shape)'),
    ('code', 'df_clean = clean_dataset(df)\nprint("Cleaned shape:", df_clean.shape)'),
    ('code', 'preprocessor = TextPreprocessor(text_col="text")\ndf_clean = preprocessor.transform(df_clean)\ndf_clean.head()'),
    ('code', 'import os\nos.makedirs("../data/processed", exist_ok=True)\ndf_clean.to_csv("../data/processed/cleaned_tickets.csv", index=False)\nprint("Saved processed dataset.")')
]
create_notebook('notebooks/02_preprocessing.ipynb', cells_02)

# 03_model_experiments.ipynb
cells_03 = [
    ('md', '# Model Experiments\nCompare various baseline models, ensemble models and boosting models.'),
    ('code', 'import pandas as pd\nimport sys\nsys.path.append("..")\nfrom src.models.train import train_and_save_model\n\ndf = pd.read_csv("../data/processed/cleaned_tickets.csv")\ndf.head()'),
    ('md', '## Predict Category'),
    ('code', 'from src.features.feature_engineering import get_tfidf_vectorizer\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.preprocessing import LabelEncoder\n\n# Split and Vectorize\nX_train, X_test, y_train, y_test = train_test_split(df["text"], df["category"], test_size=0.2, random_state=42)\nle = LabelEncoder()\ny_train_enc = le.fit_transform(y_train)\ny_test_enc = le.transform(y_test)\n\nvec = get_tfidf_vectorizer()\nX_train_vec = vec.fit_transform(X_train)\nX_test_vec = vec.transform(X_test)'),
    ('code', 'from sklearn.linear_model import LogisticRegression\nfrom sklearn.naive_bayes import MultinomialNB\nfrom sklearn.svm import LinearSVC\nfrom sklearn.metrics import classification_report\n\nmodels = {\n    "Logistic Regression": LogisticRegression(class_weight="balanced", max_iter=1000),\n    "Naive Bayes": MultinomialNB(),\n    "Linear SVM": LinearSVC(class_weight="balanced")\n}\n\nfor name, model in models.items():\n    print(f"--- {name} ---")\n    model.fit(X_train_vec, y_train_enc)\n    y_pred = model.predict(X_test_vec)\n    print(classification_report(y_test_enc, y_pred, target_names=le.classes_, zero_division=0))\n'),
    ('md', '## Ensemble Learning'),
    ('code', 'from sklearn.ensemble import VotingClassifier\n\nestimators = [(name, model) for name, model in models.items()]\nvoting = VotingClassifier(estimators=estimators, voting="hard")\nvoting.fit(X_train_vec, y_train_enc)\nprint("Voting Classifier Report:")\nprint(classification_report(y_test_enc, voting.predict(X_test_vec), target_names=le.classes_, zero_division=0))'),
]
create_notebook('notebooks/03_model_experiments.ipynb', cells_03)
print("Notebooks created successfully.")
