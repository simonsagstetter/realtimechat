import uuid
from django.db import models
from django.contrib.auth.models import User

class Chat(models.Model):
    chat_name =     models.CharField('Chat name', max_length=30, primary_key=True, default=uuid.uuid4)
    created =       models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = "chat"
        verbose_name_plural = "chats"
        db_table = "chats"
        default_related_name = "chats"

    def __str__(self):
        return self.chat_name

class Message(models.Model):
    id =            models.CharField(max_length=50, default=uuid.uuid4, primary_key=True, editable=False)
    text =          models.TextField('Text', max_length=2048)
    related_chat =  models.ForeignKey('Chat', on_delete=models.CASCADE, related_name='chats.related_name+')
    created =       models.DateTimeField(auto_now_add=True)
    user =          models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        verbose_name = "message"
        verbose_name_plural = "messages"
        db_table = "messages"
        default_related_name = "messages"

    def __str__(self):
        return self.id
