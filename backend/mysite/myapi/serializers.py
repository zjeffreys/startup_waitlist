# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate, login


from .models import Hero

class HeroSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hero
        fields = ('id','name', 'alias')

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
    
class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'password')

    def validate(self, data):
        username = data['username']
        password = data['password']

        user = authenticate(username=username, password=password)
        if user is not None:
            return data
        else:
            raise serializers.ValidationError('Invalid username or password')
