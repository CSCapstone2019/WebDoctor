from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, InsuranceViewSet, AppointmentViewSet, ReportViewSet

router = DefaultRouter()
router.register(r'patient', PatientViewSet, 'patients')
router.register(r'insurance', InsuranceViewSet, 'insurance')
router.register(r'appointment', AppointmentViewSet, 'appointment')
router.register(r'report', ReportViewSet, 'report')

urlpatterns = router.urls
