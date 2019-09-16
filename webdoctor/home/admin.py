from django.contrib import admin
from .models import Patient, Insurance, Appointment, Report

myModels = [Patient, Insurance, Appointment, Report]

# Register your models here.
admin.site.register(myModels)
