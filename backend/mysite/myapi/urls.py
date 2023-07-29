from django.urls import include, path
from rest_framework import routers
from . import views

# Define a new router for API views
user_router = routers.DefaultRouter()
user_router.register(r'register', views.UserRegisterView, basename='user-register')
user_router.register(r'login', views.UserLoginView, basename='user-login')

# Your existing router for the 'heroes' viewset
router = routers.DefaultRouter()
router.register(r'heroes', views.HeroViewSet)

# Wire up your API views using automatic URL routing
# Additionally, include the user registration and login views
urlpatterns = [
    path('', include(router.urls)),
    path('', include(user_router.urls)),  # Include the user views
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    # path('login/', views.UserLoginView.as_view()),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.authtoken')),
]
