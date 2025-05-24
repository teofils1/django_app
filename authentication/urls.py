from django.urls import path
from . import views

urlpatterns = [
    # Authentication endpoints
    path('register/', views.RegisterAPIView.as_view(), name='register'),
    path('login/', views.login_api_view, name='login'),
    path('logout/', views.logout_api_view, name='logout'),
    path('profile/', views.user_profile_view, name='profile'),
    path('change-password/', views.ChangePasswordAPIView.as_view(), name='change-password'),
]
