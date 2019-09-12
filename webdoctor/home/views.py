from django.shortcuts import render
from rest_framework import viewsets
from .models import Home
from .serializers import HomeSerializer

# Create your views here.


class HomeView(viewsets.ModelViewSet):
    queryset = Home.objects.all()
    serializer_class = HomeSerializer
