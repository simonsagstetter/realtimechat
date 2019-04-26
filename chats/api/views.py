import json
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, BasePermission
from rest_framework.response import Response
from rest_framework import status

from chats.models import Chat, Message
from chats.api.serializers import (
ChatSerializer,
MessageSerializer,
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
        elif self.action == 'destroy':
            self.permission_classes = [IsSuperUser, ]
        return super(self.__class__, self).get_permissions()

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        id = instance.pk
        self.perform_destroy(instance)
        return Response({"detail": id}, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(sender=self.request.user)

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
