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

class IsStaff(BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class ChatAPI(ModelViewSet):
    queryset = Chat.objects.all().order_by('-created')
    serializer_class = ChatSerializer
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsSuperUser, ]
        elif self.action == 'list':
            self.permission_classes = [IsStaff, ]
        return super(self.__class__, self).get_permissions()

class MessageAPI(ModelViewSet):
    queryset = Message.objects.all().order_by('-created')
    serializer_class = MessageSerializer
    permission_classes = (IsAuthenticated,)

    def get_permissions(self):
        if self.action == 'create':
            self.permission_classes = [IsStaff, ]
        elif self.action == 'list':
            self.permission_classes = [IsStaff, ]
        return super(self.__class__, self).get_permissions()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
