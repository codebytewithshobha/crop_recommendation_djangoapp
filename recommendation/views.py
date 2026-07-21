import os
import joblib
import numpy as np

from django.conf import settings
from django.views.generic import TemplateView

from .analysis_data import (
    ANALYSIS_METRICS,
    CORRELATION_MATRIX,
    CROP_DISTRIBUTION,
    FEATURE_NAMES,
    MODEL_COMPARISON,
)

# Load ML model
MODEL_PATH = os.path.join(settings.BASE_DIR, "ml", "models", "crop_model.pkl")
ENCODER_PATH = os.path.join(settings.BASE_DIR, "ml", "models", "label_encoder.pkl")

model = joblib.load(MODEL_PATH)
label_encoder = joblib.load(ENCODER_PATH)


class HomeView(TemplateView):
    template_name = "recommendation/home.html"


class AboutView(TemplateView):
    template_name = "recommendation/about.html"


class AnalysisView(TemplateView):
    template_name = "recommendation/analysis.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["metrics"] = ANALYSIS_METRICS
        context["feature_names"] = FEATURE_NAMES
        context["crop_distribution"] = CROP_DISTRIBUTION
        context["correlation_matrix"] = CORRELATION_MATRIX
        context["model_comparison"] = MODEL_COMPARISON
        return context


class PredictView(TemplateView):
    template_name = "recommendation/predict.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["prediction"] = None
        context["values"] = {}
        return context

    def post(self, request, *args, **kwargs):
        context = self.get_context_data()
        context["values"] = request.POST

        try:
            N = float(request.POST.get("nitrogen", 0))
            P = float(request.POST.get("phosphorus", 0))
            K = float(request.POST.get("potassium", 0))
            temperature = float(request.POST.get("temperature", 0))
            humidity = float(request.POST.get("humidity", 0))
            ph = float(request.POST.get("ph", 0))
            rainfall = float(request.POST.get("rainfall", 0))

            data = np.array([[N, P, K, temperature, humidity, ph, rainfall]])
            prediction = model.predict(data)
            crop = label_encoder.inverse_transform(prediction)[0]
            context["prediction"] = crop
        except Exception as e:
            context["error"] = str(e)

        return self.render_to_response(context)


class TeamView(TemplateView):
    template_name = "recommendation/team.html"


class ContactView(TemplateView):
    template_name = "recommendation/contact.html"