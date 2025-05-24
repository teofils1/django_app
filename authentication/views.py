from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth import login, logout
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib import messages
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .serializers import (
    UserRegistrationSerializer, 
    UserLoginSerializer, 
    UserSerializer,
    ChangePasswordSerializer
)


# API Views
class RegisterAPIView(generics.CreateAPIView):
    """
    API endpoint for user registration
    """
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Get or create token
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'User registered successfully'
        }, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([permissions.AllowAny])
def login_api_view(request):
    """
    API endpoint for user login
    """
    serializer = UserLoginSerializer(data=request.data, context={'request': request})
    
    if serializer.is_valid():
        user = serializer.validated_data['user']
        login(request, user)
        
        # Get or create token
        token, created = Token.objects.get_or_create(user=user)
        
        return Response({
            'user': UserSerializer(user).data,
            'token': token.key,
            'message': 'Login successful'
        }, status=status.HTTP_200_OK)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def logout_api_view(request):
    """
    API endpoint for user logout
    """
    try:
        # Delete the user's token
        request.user.auth_token.delete()
    except:
        pass
    
    logout(request)
    return Response({
        'message': 'Logout successful'
    }, status=status.HTTP_200_OK)


@api_view(['GET'])
def user_profile_view(request):
    """
    API endpoint to get current user profile
    """
    serializer = UserSerializer(request.user)
    return Response(serializer.data)


class ChangePasswordAPIView(generics.UpdateAPIView):
    """
    API endpoint for changing password
    """
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            # Set new password
            user = request.user
            user.set_password(serializer.validated_data['new_password'])
            user.save()
            
            # Delete old token and create new one
            try:
                user.auth_token.delete()
            except:
                pass
            
            Token.objects.create(user=user)
            
            return Response({
                'message': 'Password changed successfully'
            }, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Web Views (for form-based authentication)
def login_view(request):
    """
    Web view for login form
    """
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        
        serializer = UserLoginSerializer(
            data={'username': username, 'password': password},
            context={'request': request}
        )
        
        if serializer.is_valid():
            user = serializer.validated_data['user']
            login(request, user)
            messages.success(request, 'Login successful!')
            
            # Redirect to next page or default
            next_page = request.GET.get('next', '/')
            return redirect(next_page)
        else:
            for error in serializer.errors.values():
                messages.error(request, error[0])
    
    return render(request, 'authentication/login.html')


def register_view(request):
    """
    Web view for registration form
    """
    if request.method == 'POST':
        data = {
            'username': request.POST.get('username'),
            'email': request.POST.get('email'),
            'first_name': request.POST.get('first_name'),
            'last_name': request.POST.get('last_name'),
            'password': request.POST.get('password'),
            'password_confirm': request.POST.get('password_confirm'),
        }
        
        serializer = UserRegistrationSerializer(data=data)
        
        if serializer.is_valid():
            user = serializer.save()
            login(request, user)
            messages.success(request, 'Registration successful! You are now logged in.')
            return redirect('/')
        else:
            for field, errors in serializer.errors.items():
                for error in errors:
                    messages.error(request, f"{field}: {error}")
    
    return render(request, 'authentication/register.html')


def logout_view(request):
    """
    Web view for logout
    """
    logout(request)
    messages.success(request, 'You have been logged out successfully.')
    return redirect('login')
