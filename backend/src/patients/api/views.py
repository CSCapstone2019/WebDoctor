from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import PatientSerializer, InsuranceSerializer
from ..models import Patient, Insurance


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