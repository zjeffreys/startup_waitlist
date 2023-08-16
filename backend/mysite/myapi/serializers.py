# serializers.py
from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate, login
from .models import Waitlist

class WaitlistSerializer(serializers.ModelSerializer):
    emails = serializers.SerializerMethodField()  # Use the correct field name here

    class Meta:
        model = Waitlist
        fields = ['id', 'user', 'name', 'headline', 'subheadline', 'cta', 'hero_url', 'emails']
    def get_emails(self, obj):
        emails = obj.emails.all()
        print("getting emails")
        return [email.email_address for email in emails]
    