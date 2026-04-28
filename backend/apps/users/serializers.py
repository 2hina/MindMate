from rest_framework import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)

    class Meta:
        model  = User
        fields = ('id', 'name', 'email', 'password')

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserSerializer(serializers.ModelSerializer):
    avatar_url = serializers.SerializerMethodField()
    initials   = serializers.ReadOnlyField()
    joined     = serializers.SerializerMethodField()

    class Meta:
        model  = User
        fields = ('id', 'name', 'email', 'bio', 'avatar_url', 'initials', 'joined', 'created_at')

    def get_avatar_url(self, obj):
        request = self.context.get('request')
        if obj.avatar and request:
            return request.build_absolute_uri(obj.avatar.url)
        return None

    def get_joined(self, obj):
        return obj.created_at.strftime('%B %Y')


class AuthResponseSerializer(serializers.Serializer):
    """Wraps user + JWT tokens into a single response."""
    user    = UserSerializer()
    access  = serializers.CharField()
    refresh = serializers.CharField()

    @staticmethod
    def get_tokens(user):
        refresh = RefreshToken.for_user(user)
        return str(refresh.access_token), str(refresh)
