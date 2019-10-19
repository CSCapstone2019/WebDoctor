from rest_framework.routers import DefaultRouter
# from django.urls import path
from .views import PatientViewSet, InsuranceViewSet

router = DefaultRouter()
router.register(r'patient', PatientViewSet, base_name='patients')
router.register(r'insurance', InsuranceViewSet, base_name='insurance')
urlpatterns = router.urls

# urlpatterns = [
#     path('patient/', PatientListView.as_view()),
#     path('patient/<pk>', PatientDetailView.as_view()),
#     path('insurance/', InsuranceListView.as_view()),
#     path('insurance/<pk>', InsuranceDetailView.as_view()),
# ]
