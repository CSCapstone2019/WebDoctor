from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from patients.models import Appointment, Patient

User = get_user_model()


# def get_last_10_messages(chatId):
#     chat = get_object_or_404(Chat, chat_id=chatId)
#     return chat.messages.order_by('-timestamp').all()[:10]


# def get_user_contact(username):
#     user = get_object_or_404(User, username=username)
#     return get_object_or_404(Contact, user=user)


# def get_current_chat(chatId):
#     return get_object_or_404(Chat, chat_id=chatId) 

# def get_current_chat(chatId):
#     return get_object_or_404(Chat, chat_id=chatId) 