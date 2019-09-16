from django.shortcuts import render
from rest_framework import viewsets
# from drf_multiple_model.views import ObjectMultipleModelAPIView
from .models import Insurance, Appointment, Report, Patient
from .serializers import InsuranceSerializer, AppointmentSerializer, ReportSerializer, PatientSerializer

# Create your views here.


class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer
