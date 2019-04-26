from rest_framework import serializers
from django.contrib.auth.models import User

from accounts.models import Profile


class UserSerializer(serializers.ModelSerializer):
    last_login = serializers.DateTimeField(format='%d.%m %H:%M', read_only=True)
    class Meta:
        model = User
        fields = [
            'id',
            'username',
            'last_login'
        ]

class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Profile
        fields = [
            'user',
            'is_online',
        ]
        depth = 1
