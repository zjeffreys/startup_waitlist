# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate, login


# from .models import Hero

# class HeroSerializer(serializers.HyperlinkedModelSerializer):
#     class Meta:
#         model = Hero
#         fields = ('id','name', 'alias')

