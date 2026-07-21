import os
import joblib
import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score
)

from sklearn.ensemble import (
    RandomForestClassifier,
    GradientBoostingClassifier
)

from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.neighbors import KNeighborsClassifier
from sklearn.svm import SVC
from sklearn.naive_bayes import GaussianNB


# ----------------------------------------
# Load Dataset
# ----------------------------------------

DATA_PATH = os.path.join("ml", "data", "crop.csv")

print("\nLoading dataset...")
df = pd.read_csv(DATA_PATH)

print(f"Dataset Shape: {df.shape}")

print("\nMissing Values:")
print(df.isnull().sum())

print("\nDuplicate Rows:", df.duplicated().sum())


# ----------------------------------------
# Features and Target
# ----------------------------------------

X = df.drop("label", axis=1)
y = df["label"]

# Encode labels
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)


# ----------------------------------------
# Train Test Split
# ----------------------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y_encoded,
    test_size=0.2,
    random_state=42,
    stratify=y_encoded
)


# ----------------------------------------
# Models
# ----------------------------------------

models = {
    "Random Forest": RandomForestClassifier(
        n_estimators=200,
        random_state=42
    ),

    "Decision Tree": DecisionTreeClassifier(
        random_state=42
    ),

    "Logistic Regression": LogisticRegression(
        max_iter=5000
    ),

    "KNN": KNeighborsClassifier(),

    "SVM": SVC(),

    "Gaussian NB": GaussianNB(),

    "Gradient Boosting": GradientBoostingClassifier(
        random_state=42
    )
}


# ----------------------------------------
# Train and Compare Models
# ----------------------------------------

results = []

best_model = None
best_accuracy = 0
best_model_name = ""

print("\nTraining Models...\n")

for name, model in models.items():

    model.fit(X_train, y_train)

    predictions = model.predict(X_test)

    accuracy = accuracy_score(y_test, predictions)

    precision = precision_score(
        y_test,
        predictions,
        average="weighted"
    )

    recall = recall_score(
        y_test,
        predictions,
        average="weighted"
    )

    f1 = f1_score(
        y_test,
        predictions,
        average="weighted"
    )

    results.append([
        name,
        round(accuracy, 4),
        round(precision, 4),
        round(recall, 4),
        round(f1, 4)
    ])

    if accuracy > best_accuracy:
        best_accuracy = accuracy
        best_model = model
        best_model_name = name


# ----------------------------------------
# Results Table
# ----------------------------------------

results_df = pd.DataFrame(
    results,
    columns=[
        "Model",
        "Accuracy",
        "Precision",
        "Recall",
        "F1 Score"
    ]
)

results_df = results_df.sort_values(
    by="Accuracy",
    ascending=False
)

print("\nModel Comparison")
print("=" * 70)
print(results_df)

print("\nBest Model:", best_model_name)
print("Best Accuracy:", round(best_accuracy, 4))


# ----------------------------------------
# Save Model
# ----------------------------------------

os.makedirs(
    os.path.join("ml", "models"),
    exist_ok=True
)

joblib.dump(
    best_model,
    os.path.join("ml", "models", "crop_model.pkl")
)

joblib.dump(
    label_encoder,
    os.path.join("ml", "models", "label_encoder.pkl")
)

print("\nModel saved successfully!")
print("Location: ml/models/")