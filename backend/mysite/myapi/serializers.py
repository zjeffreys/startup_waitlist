# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate, login
from .models import Waitlist

class WaitlistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Waitlist
        fields = ['id', 'user', 'name', 'headline', 'subheadline', 'cta', 'hero_url']


