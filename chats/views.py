from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
import json
from django.contrib import messages

from chats.models import Chat

def index(request):
    return render(request, 'chats/index.html')

def room(request, room_name):
    chat_list = Chat.objects.all()
    for value in chat_list:
        if room_name == value.chat_name:
            return render(request, 'chats/chat.html', {
                'room_name_json': mark_safe(json.dumps(room_name))
            })
    return render(request, 'chats/404.html', {"room_name": mark_safe(json.dumps(room_name))})
