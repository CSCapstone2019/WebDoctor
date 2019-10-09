from django.urls import path
from .views import (
    PatientListView,
    PatientDetailView,
    InsuranceListView,
    InsuranceDetailView,
    AppointmentListView,
    AppointmentDetailView,
    ReportListView,
    ReportDetailView
)

urlpatterns = [
    path('patient/', PatientListView.as_view()),
    path('patient/<pk>', PatientDetailView.as_view()),
    path('insurance/', InsuranceListView.as_view()),
    path('insurance/<pk>', InsuranceDetailView.as_view()),
    path('appointment/', AppointmentListView.as_view()),
    path('appointment/<pk>', AppointmentDetailView.as_view()),
    path('report/', ReportListView.as_view()),
    path('report/<pk>', ReportDetailView.as_view()),
]
