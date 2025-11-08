
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
