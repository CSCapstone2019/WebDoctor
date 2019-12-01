from django.contrib import admin
from .models import Patient, Insurance, Appointment

myModels = [Patient, Insurance, Appointment]

admin.site.register(myModels)
