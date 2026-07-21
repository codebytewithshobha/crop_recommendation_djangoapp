import os
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

MODEL_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "models",
    "crop_model.pkl"
)

ENCODER_PATH = os.path.join(
    BASE_DIR,
    "ml",
    "models",
    "label_encoder.pkl"
)

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)


def predict_crop(n, p, k, temperature, humidity, ph, rainfall):
    features = np.array([[n, p, k, temperature, humidity, ph, rainfall]])

    prediction = model.predict(features)

    crop = label_encoder.inverse_transform(prediction)

    return crop[0]