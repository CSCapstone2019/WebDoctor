from django.urls import re_path
from .consumers import ChatConsumer

# Apply chat consumer to handle websocket connection
websocket_urlpatterns = [
    re_path(r'ws/chat/(?P<room_name>\w+)/$', ChatConsumer),
]