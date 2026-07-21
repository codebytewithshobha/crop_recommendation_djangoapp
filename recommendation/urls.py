"""URL configuration for the recommendation app."""

from django.urls import path

from . import views

app_name = "recommendation"

urlpatterns = [
    path("", views.HomeView.as_view(), name="home"),
    path("about/", views.AboutView.as_view(), name="about"),
    path("analysis/", views.AnalysisView.as_view(), name="analysis"),
    path("predict/", views.PredictView.as_view(), name="predict"),
    path("team/", views.TeamView.as_view(), name="team"),
    path("contact/", views.ContactView.as_view(), name="contact"),
]
