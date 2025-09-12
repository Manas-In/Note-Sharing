# from django.shortcuts import render 
# from rest_framework.response import Response
# from .serilizers import UserSerilizer
# from django.contrib.auth.models import User
# from .models import CustomUser
# from rest_framework import generics
# from rest_framework.permissions import IsAdminUser
# # Create your views here.


# class ListCreateAPIView(generics.ListCreateAPIView):
#     queryset=  CustomUser.objects.all()
#     serializer_class = UserSerilizer
#     # permission_classes = []
    
#     # def list(self, request):
#     #     # Note the use of `get_queryset()` instead of `self.queryset`
#     #     queryset = self.get_queryset()
#     #     serializer = UserSerilizer(queryset, many=True)
#     #     return Response(serializer.data)

# class listGateApiView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = CustomUser.objects.all()
#     serializer_class = UserSerilizer
#     # permission_classes = [IsAdminUser]
    
    
# from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView
# from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
# from rest_framework.permissions import AllowAny


# # Custom serializer to use email
# class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
#     @classmethod
#     def get_token(cls, user):
#         token = super().get_token(user)

#         # Add custom claims
#         token["email"] = user.email
#         return token

#     def validate(self, attrs):
#         # Change username to email
#         attrs["username"] = attrs.get("email")
#         return super().validate(attrs)


# # Login View
# class EmailLoginView(TokenObtainPairView):
#     serializer_class = EmailTokenObtainPairSerializer
#     permission_classes = [AllowAny]


# # Refresh View (built-in, just expose)
# class CustomTokenRefreshView(TokenRefreshView):
#     permission_classes = [AllowAny]


# # Verify View (built-in, just expose)
# class CustomTokenVerifyView(TokenVerifyView):
#     permission_classes = [AllowAny]




from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from .models import CustomUser
from .serilizers import UserSerializer


# 🔹 Signup View
class RegisterUserView(generics.CreateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


# 🔹 Custom Login with Email
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add extra fields to token payload
        token["username"] = user.username
        token["email"] = user.email
        return token

    def validate(self, attrs):
        # Force "username" field in validation to accept "email"
        attrs["username"] = attrs.get("email")
        return super().validate(attrs)


class EmailLoginView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer
    permission_classes = [AllowAny]


# 🔹 Refresh Token (default from SimpleJWT)
class CustomTokenRefreshView(TokenRefreshView):
    permission_classes = [AllowAny]
