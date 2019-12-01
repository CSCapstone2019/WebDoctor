from django.contrib.auth import get_user_model
from django.shortcuts import render, get_object_or_404
from patients.models import Chat, Contact, Scheduler, Uploader
from django.core.files.storage import FileSystemStorage
from django.views.decorators.csrf import csrf_exempt


User = get_user_model()


def get_last_10_messages(chatId):
    chat = get_object_or_404(Chat, chat_id=chatId)
    return chat.messages.order_by('-timestamp').all()[:10]


def get_user_contact(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Contact, user=user)

def get_user_scheduler(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Scheduler, user=user)

def get_user_uploader(username):
    user = get_object_or_404(User, username=username)
    return get_object_or_404(Uploader, user=user)

def get_current_chat(chatId):
    return get_object_or_404(Chat, chat_id=chatId) 

@csrf_exempt 
def upload(request):
    print ("UPLOAD REUQEST VIEW___________: ", request)
    context = {}
    if request.method == 'POST':
        uploaded_file = request.FILES['document']
        fs = FileSystemStorage()
        name = fs.save(uploaded_file.name, uploaded_file)
        context['url'] = fs.url(name)
        print("-----------VIEWS CONTEXT FOR UPLOAD:", context)
    return context
