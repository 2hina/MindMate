from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import RegisterSerializer, UserSerializer, AuthResponseSerializer


def _token_response(user, request):
    access, refresh = AuthResponseSerializer.get_tokens(user)
    return Response({
        'user':    UserSerializer(user, context={'request': request}).data,
        'access':  access,
        'refresh': refresh,
    }, status=status.HTTP_200_OK)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def register(request):
    serializer = RegisterSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    user = serializer.save()
    return _token_response(user, request)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login(request):
    email    = request.data.get('email', '').lower().strip()
    password = request.data.get('password', '')
    user = authenticate(request, username=email, password=password)
    if not user:
        return Response({'detail': 'Invalid email or password.'}, status=status.HTTP_401_UNAUTHORIZED)
    return _token_response(user, request)


@api_view(['GET', 'PATCH'])
def me(request):
    if request.method == 'GET':
        return Response(UserSerializer(request.user, context={'request': request}).data)

    # PATCH — update profile
    serializer = UserSerializer(request.user, data=request.data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
