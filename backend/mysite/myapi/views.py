from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from rest_framework import status
from django.contrib.auth import authenticate


from .serializers import HeroSerializer
from .models import Hero


class HeroViewSet(viewsets.ModelViewSet):
    queryset = Hero.objects.all().order_by('name')
    serializer_class = HeroSerializer

class UserRegisterView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class UserLoginView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

    def list(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)

        if user is not None:
            serializer = self.get_serializer(user)
            return Response(serializer.data)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)