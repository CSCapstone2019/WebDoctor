from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from rest_framework import permissions
from rest_framework import viewsets

from django.core.files.storage import FileSystemStorage

from rest_framework.generics import (
    ListAPIView,
    RetrieveAPIView,
    CreateAPIView,
    DestroyAPIView,
    UpdateAPIView
)
from patients.models import Chat, Contact, Schedule, Scheduler, Report, Uploader
from chat.views import get_user_contact, get_user_scheduler, get_user_uploader
from .serializers import ChatSerializer, ScheduleSerializer, ReportSerializer

User = get_user_model()


class ChatListView(ListAPIView):
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Chat.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            contact = get_user_contact(username)
            queryset = contact.chats.all()
        return queryset


class ChatDetailView(RetrieveAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.AllowAny, )


class ChatCreateView(CreateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatUpdateView(UpdateAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ChatDeleteView(DestroyAPIView):
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    permission_classes = (permissions.IsAuthenticated, )


# SCHEDULE
class ScheduleListView(ListAPIView):
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Schedule.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            scheduler = get_user_scheduler(username)
            queryset = scheduler.schedule.all()
        return queryset


class ScheduleDetailView(RetrieveAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.AllowAny, )


class ScheduleCreateView(CreateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ScheduleUpdateView(UpdateAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ScheduleDeleteView(DestroyAPIView):
    queryset = Schedule.objects.all()
    serializer_class = ScheduleSerializer
    permission_classes = (permissions.IsAuthenticated, )


# UPLOAD

class ReportListView(ListAPIView):
    serializer_class = ReportSerializer
    permission_classes = (permissions.AllowAny, )

    def get_queryset(self):
        queryset = Report.objects.all()
        username = self.request.query_params.get('username', None)
        if username is not None:
            uploader = get_user_uploader(username)
            queryset = uploader.report.all() 
        return queryset


class ReportDetailView(RetrieveAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (permissions.AllowAny, )


class ReportCreateView(CreateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ReportUpdateView(UpdateAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (permissions.IsAuthenticated, )


class ReportDeleteView(DestroyAPIView):
    queryset = Report.objects.all()
    serializer_class = ReportSerializer
    permission_classes = (permissions.IsAuthenticated, )