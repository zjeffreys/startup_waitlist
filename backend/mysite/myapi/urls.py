from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.routers import DefaultRouter
from .views import WaitlistViewSet


router = DefaultRouter()
router.register(r'waitlists', WaitlistViewSet, basename='waitlist')

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),

]
