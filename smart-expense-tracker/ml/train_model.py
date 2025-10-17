# ======= ml/train_model.py (COMPLETE) =======

# ======= ml/train_model.py (FINAL CORRECTED CODE) =======

import pandas as pd
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
# --- FIX: Import MinMaxScaler instead of StandardScaler ---
from sklearn.preprocessing import MinMaxScaler 

# IMPORTANT: This file MUST exist and contain 'description', 'category', and 'amount'
DATA_FILE = 'sample_expenses_enhanced.csv'

# --- Load the data (Error handling kept simple) ---
try:
    df = pd.read_csv(DATA_FILE)
except FileNotFoundError:
    print(f"ERROR: Training data file '{DATA_FILE}' not found. Cannot train model.")
    exit(1)

# Prepare data
X = df[['description', 'amount']]
y = df['category']

# --- Define Preprocessing Steps (The ColumnTransformer) ---
preprocessor = ColumnTransformer(
    transformers=[
        # Transformer 1: Text Feature (TF-IDF)
        ('text_feature', 
         TfidfVectorizer(ngram_range=(1,2), min_df=1), 
         'description'), 
        
        # --- FIX APPLIED HERE: Use MinMaxScaler instead of StandardScaler ---
        ('numeric_feature', 
         MinMaxScaler(), 
         ['amount']) 
    ],
    remainder='passthrough'
)

# --- Define the Full Pipeline ---
model_pipeline = Pipeline(steps=[
    ('preprocessor', preprocessor),
    # MultinomialNB must have non-negative input
    ('classifier', MultinomialNB(alpha=0.5)) 
])

# Train the model
# This step will now succeed because MinMaxScaler guarantees positive outputs (0 to 1).
model_pipeline.fit(X, y)

# Save the entire pipeline bundle
bundle = {'pipeline': model_pipeline, 'feature_names': X.columns.tolist()}
joblib.dump(bundle, 'expense_model.joblib')
print('SUCCESS: Saved updated pipeline model to expense_model.joblib')