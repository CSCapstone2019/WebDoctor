from django.contrib import admin
from patients.models import Message, Chat, Contact, Schedule, Scheduler, Report, Uploader

admin.site.register(Contact)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Schedule)
admin.site.register(Scheduler)
admin.site.register(Report)
admin.site.register(Uploader)