from rest_framework import viewsets
# from rest_framework.generics import ListAPIView, RetrieveAPIView
from .serializers import PatientSerializer, InsuranceSerializer
from ..models import Patient, Insurance

class PatientViewSet(viewsets.ModelViewSet):
    queryset = Patient.objects.all()
    serializer_class = PatientSerializer


class InsuranceViewSet(viewsets.ModelViewSet):
    queryset = Insurance.objects.all()
    serializer_class = InsuranceSerializer


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
