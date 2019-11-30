from django.contrib import admin
from patients.models import Message, Chat, Contact, Schedule

admin.site.register(Contact)
admin.site.register(Chat)
admin.site.register(Message)
admin.site.register(Schedule)