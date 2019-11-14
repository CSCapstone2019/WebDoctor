from django.contrib import admin
from patients.models import Message, Chat, Contact

admin.site.register(Contact)
admin.site.register(Chat)
admin.site.register(Message)