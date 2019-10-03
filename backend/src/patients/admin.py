from django.contrib import admin
from .models import Patient, Insurance

myModels = [Patient, Insurance]

admin.site.register(myModels)
