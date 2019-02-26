from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, BasePermission

from chats.models import Chat, Message
from chats.api.serializers import (
ChatSerializer,
MessageSerializer
)

class IsSuperUser(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser

class ChatAPI(ModelViewSet):
    queryset = Chat.objects.all().order_by('-created')
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsSuperUser, ]
        return super(self.__class__, self).get_permissions()

class MessageAPI(ModelViewSet):
    queryset = Message.objects.all().order_by('-created')
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
