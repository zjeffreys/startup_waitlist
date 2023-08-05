from django.urls import include, path
from rest_framework import routers
from . import views
from rest_framework.routers import DefaultRouter
from .views import WaitlistViewSet, PagesViewSet


router = DefaultRouter()
router.register(r'waitlists', WaitlistViewSet, basename='waitlist')
router.register(r'pages', PagesViewSet, basename='pages')

urlpatterns = [
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
    path('', include(router.urls)),

]
