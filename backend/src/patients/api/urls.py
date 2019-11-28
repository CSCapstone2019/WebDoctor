from rest_framework.routers import DefaultRouter
from .views import PatientViewSet, InsuranceViewSet, AppointmentViewSet, ReportViewSet, StaffUserViewSet, PatientUserViewSet

router = DefaultRouter()
router.register(r'patient', PatientViewSet, 'patients')
router.register(r'insurance', InsuranceViewSet, 'insurance')
router.register(r'appointment', AppointmentViewSet, 'appointment')
router.register(r'report', ReportViewSet, 'report')
router.register(r'staff', StaffUserViewSet, 'staff')
router.register(r'patients', PatientUserViewSet, 'patients')

urlpatterns = router.urls