from rest_framework import viewsets, permissions
# from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import PatientSerializer, InsuranceSerializer, AppointmentSerializer, ReportSerializer
from ..models import Patient, Insurance, Appointment, Report

class PatientViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = PatientSerializer

    def get_queryset(self):
        return self.request.user.patients.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer


class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer


class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer


# class PatientListView(ListAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientSerializer


# class PatientDetailView(RetrieveAPIView):
#     queryset = Patient.objects.all()
#     serializer_class = PatientSerializer


# class InsuranceListView(ListAPIView):
#     queryset = Insurance.objects.all()
#     serializer_class = InsuranceSerializer


# class InsuranceDetailView(RetrieveAPIView):
#     queryset = Insurance.objects.all()
#     serializer_class = InsuranceSerializer
