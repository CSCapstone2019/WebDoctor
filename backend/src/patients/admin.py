from django.contrib import admin
from .models import Patient, Insurance, Appointment, Report

myModels = [Patient, Insurance, Appointment, Report]

admin.site.register(myModels)
