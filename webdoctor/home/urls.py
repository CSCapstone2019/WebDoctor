from django.urls import path, include
from . import views
from rest_framework import routers

router = routers.DefaultRouter()
router.register('insurance', views.InsuranceViewSet)
router.register('appointment', views.AppointmentViewSet)
router.register('report', views.ReportViewSet)
router.register('patient', views.PatientViewSet)

urlpatterns = [
    path('', include(router.urls))
]
