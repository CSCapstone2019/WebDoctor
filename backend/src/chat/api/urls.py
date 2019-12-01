from django.urls import path, re_path
from django.conf import settings
from django.conf.urls.static import static
from chat import views

from .views import (
    ChatListView,
    ChatDetailView,
    ChatCreateView,
    ChatUpdateView,
    ChatDeleteView,
    ScheduleListView,
    ScheduleDetailView,
    ScheduleCreateView,
    ScheduleUpdateView,
    ScheduleDeleteView,
    ReportListView,
    ReportDetailView,
    ReportCreateView,
    ReportUpdateView,
    ReportDeleteView,
)

app_name = 'chat'

urlpatterns = [
    path('', ChatListView.as_view()),
    path('create/', ChatCreateView.as_view()),
    path('<pk>', ChatDetailView.as_view()),
    path('<pk>/update/', ChatUpdateView.as_view()),
    path('<pk>/delete/', ChatDeleteView.as_view()),

    path('schedule/', ScheduleListView.as_view()),
    path('schedule/create/', ScheduleCreateView.as_view()),
    path('schedule/<pk>', ScheduleDetailView.as_view()),
    path('schedule/<pk>/update/', ScheduleUpdateView.as_view()),
    path('schedule/<pk>/delete/', ScheduleDeleteView.as_view()),
    
    
    path('upload/', views.upload, name='upload'),

    path('report/', ReportListView.as_view()),
    path('report/create/', ReportCreateView.as_view()),
    path('report/<pk>', ReportDetailView.as_view()),
    path('report/<pk>/update/', ReportUpdateView.as_view()),
    path('report/<pk>/delete/', ReportDeleteView.as_view()),
] 

# # Serving media urls
# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)