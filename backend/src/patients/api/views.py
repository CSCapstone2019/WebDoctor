from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import PatientSerializer, InsuranceSerializer, AppointmentSerializer, ReportSerializer
from ..models import Patient, Insurance, Appointment, Report


class PatientListView(ListAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class PatientDetailView(RetrieveAPIView):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class InsuranceListView(ListAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer


class InsuranceDetailView(RetrieveAPIView):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer


class AppointmentListView(ListAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class AppointmentDetailView(RetrieveAPIView):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class ReportListView(ListAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


class ReportDetailView(RetrieveAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer