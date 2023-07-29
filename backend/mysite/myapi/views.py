from django.shortcuts import render
from rest_framework import viewsets
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, UserLoginSerializer
from rest_framework import status
from django.contrib.auth import authenticate
from django.contrib.auth import login
from rest_framework.response import Response
from rest_framework.views import APIView


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
    serializer_class = UserLoginSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            login(request, serializer.validated_data['user'])
            return Response(status=status.HTTP_200_OK)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

def get_user_info(request):
    user = request.user
    # Customize the response as per your user model. Assuming you have a custom User model.
    user_data = {
        'username': user.username,
        'email': user.email,
        # Add more fields as needed
    }
    return Response(user_data)