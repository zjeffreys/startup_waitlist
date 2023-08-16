from django.db import models
from django.contrib.auth.models import User


class Hero(models.Model):
    name = models.CharField(max_length=60)
    alias = models.CharField(max_length=60)
    def __str__(self):
        return self.name

class Email(models.Model):
    email_address = models.EmailField(unique=False)

    def __str__(self):
        return self.email_address
    
    
class Waitlist(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    headline = models.CharField(max_length=200, default="Headline")
    subheadline = models.CharField(max_length=200, default="Subheadline")
    cta = models.CharField(max_length=100, default="Call to Action")
    hero_url = models.CharField(max_length=200, default="https://www.youtube.com/watch?v=uwfav6xqBcI")
    emails = models.ManyToManyField(Email, blank=True)

    def __str__(self):
        return self.name


