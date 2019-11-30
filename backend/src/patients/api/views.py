from rest_framework import viewsets, permissions
from .serializers import PatientSerializer, InsuranceSerializer, AppointmentSerializer, ReportSerializer, UserSerializer
from ..models import Patient, Insurance, Appointment, Report
from django.contrib.auth.models import User

# Get All Users
class StaffUserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(is_staff=True)

class PatientUserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.filter(is_staff=False)


class PatientViewSet(viewsets.ModelViewSet):
    # queryset = Patient.objects.all()
    permission_classes = [
        permissions.IsAuthenticated,
    ]
    serializer_class = PatientSerializer

    def get_queryset(self):
        return self.request.user.patients.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AppointmentViewSet(viewsets.ModelViewSet):
    # queryset = Appointment.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = AppointmentSerializer

    def get_queryset(self):
        return self.request.user.appointments.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = InsuranceSerializer
    
class ReportViewSet(viewsets.ModelViewSet):
    queryset = Report.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ReportSerializer
