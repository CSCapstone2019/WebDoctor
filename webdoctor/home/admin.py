from django.contrib import admin
from . import models

myModels = [models.Patient, models.Insurance,
            models.Appointment, models.Report]

# Register your models here.
admin.site.register(myModels)
