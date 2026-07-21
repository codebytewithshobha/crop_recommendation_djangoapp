"""Placeholder dataset and model metrics for the Analysis page."""

FEATURE_NAMES = [
    "Nitrogen",
    "Phosphorus",
    "Potassium",
    "Temperature",
    "Humidity",
    "pH",
    "Rainfall",
]

ANALYSIS_METRICS = {
    "total_samples": 2200,
    "num_crops": 22,
    "features_used": len(FEATURE_NAMES),
    "best_model": "Random Forest",
    "accuracy": 99.55,
}

CROP_DISTRIBUTION = {
    "labels": [
        "Rice",
        "Maize",
        "Chickpea",
        "Kidney Beans",
        "Pigeon Peas",
        "Moth Beans",
        "Mung Bean",
        "Black Gram",
        "Lentil",
        "Pomegranate",
        "Banana",
        "Mango",
        "Grapes",
        "Watermelon",
        "Muskmelon",
        "Apple",
        "Orange",
        "Papaya",
        "Coconut",
        "Cotton",
        "Jute",
        "Coffee",
    ],
    "counts": [
        105, 103, 102, 102, 101, 100, 100, 100, 100, 100,
        100, 100, 100, 100, 100, 100, 100, 100, 100, 100,
        100, 100,
    ],
}

# Symmetric placeholder correlation matrix (feature order matches FEATURE_NAMES).
CORRELATION_MATRIX = [
    [1.00, 0.12, 0.08, -0.05, 0.03, 0.15, -0.02],
    [0.12, 1.00, 0.18, 0.04, -0.06, 0.22, 0.07],
    [0.08, 0.18, 1.00, 0.02, -0.04, 0.11, 0.05],
    [-0.05, 0.04, 0.02, 1.00, 0.65, -0.18, 0.41],
    [0.03, -0.06, -0.04, 0.65, 1.00, -0.12, 0.38],
    [0.15, 0.22, 0.11, -0.18, -0.12, 1.00, -0.09],
    [-0.02, 0.07, 0.05, 0.41, 0.38, -0.09, 1.00],
]

MODEL_COMPARISON = [
    {"model": "Random Forest", "accuracy": 99.55},
    {"model": "Gradient Boosting", "accuracy": 98.86},
    {"model": "SVM", "accuracy": 97.73},
    {"model": "K-Nearest Neighbors", "accuracy": 96.82},
    {"model": "Naive Bayes", "accuracy": 95.45},
    {"model": "Logistic Regression", "accuracy": 94.09},
]
