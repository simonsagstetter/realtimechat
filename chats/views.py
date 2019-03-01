import json
from django.shortcuts import render, redirect
from django.utils.safestring import mark_safe
from django.contrib import messages
from django.http import HttpResponseNotFound

from chats.models import Chat

def index(request):
    return render(request, 'chats/index.html')

def room(request, room_name):
    chat_list = Chat.objects.all()
    for value in chat_list:
        if room_name == value.chat_name:
            if request.user and request.user.is_staff:
                return render(request, 'chats/chat.html', {
                    'room_name_json': mark_safe(json.dumps(room_name))
                })
            else:
                return redirect('chats:index')
    return HttpResponseNotFound("This Page does not exist!")
