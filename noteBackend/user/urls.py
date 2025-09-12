# from django.urls import path
# from .views import ListCreateAPIView, listGateApiView
# from rest_framework_simplejwt.views import(
#     TokenRefreshView,
#     TokenObtainPairView
# )

# from .views import EmailLoginView, CustomTokenRefreshView, CustomTokenVerifyView 


# urlpatterns = [
#     path('', ListCreateAPIView.as_view(), name='user-list'),
#   path("login/", EmailLoginView.as_view(), name="email_login"),
#     path("refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
#     path("verify/", CustomTokenVerifyView.as_view(), name="token_verify"),
#     # path('', notes.as_view() , name='notes'),
# ]




from django.urls import path
from .views import RegisterUserView, EmailLoginView, CustomTokenRefreshView

urlpatterns = [
    path("register/", RegisterUserView.as_view(), name="register"),
    path("login/", EmailLoginView.as_view(), name="email_login"),
    path("refresh/", CustomTokenRefreshView.as_view(), name="token_refresh"),
]
