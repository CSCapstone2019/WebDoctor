from django.contrib import admin
from patients.models import Message, Chat, Contact, Schedule, Scheduler

admin.site.register(Contact)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Schedule)
admin.site.register(Scheduler)