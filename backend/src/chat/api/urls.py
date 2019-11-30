from django.urls import path, re_path

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
] 