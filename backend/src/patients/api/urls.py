from django.urls import path
from .views import (
    PatientListView,
    PatientDetailView,
    InsuranceListView,
    InsuranceDetailView
)

urlpatterns = [
    path('patient/', PatientListView.as_view()),
    path('patient/<pk>', PatientDetailView.as_view()),
    path('insurance/', InsuranceListView.as_view()),
    path('insurance/<pk>', InsuranceDetailView.as_view()),
]
