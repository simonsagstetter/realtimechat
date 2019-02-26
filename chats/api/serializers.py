from rest_framework import serializers
from django.contrib.auth.models import User

from chats.models import Chat, Message

class ChatSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%d.%m.%Y %H:%M', read_only=True)

    class Meta:
        model = Chat
        fields = [
            'chat_name',
            'created'
        ]

class MessageSerializer(serializers.ModelSerializer):
    created = serializers.DateTimeField(format='%d.%m.%Y %H:%M', read_only=True)
    related_chat = serializers.PrimaryKeyRelatedField(many=False, read_only=False, queryset=Chat.objects.all())

    class Meta:
        model = Message
        fields = [
            'id',
            'text',
            'related_chat',
            'created',
            'user'
        ]
        depth = 1
