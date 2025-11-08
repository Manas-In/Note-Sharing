




from django.urls import path
from .views import RegisterUserView, EmailLoginView, CustomTokenRefreshView

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", EmailLoginView.as_view(), name="email_login"),
    path("refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
]
