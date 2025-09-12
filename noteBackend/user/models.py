# from django.contrib.auth.models import AbstractUser
# from django.db import models

# class CustomUser(AbstractUser):
#         # Add your custom fields here
#         email = models.EmailField(unique=True)
       
       
#         USERNAME_FIELD = 'email'
#         REQUIRED_FIELDS = ['username']
#         # If you want to use email as the primary identifier for login
#         # email = models.EmailField(unique=True) 

#         # REQUIRED_FIELDS = ['username', 'first_name', 'last_name'] # if you keep username








from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("Email is required")

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        return self.create_user(email, password, **extra_fields)


class CustomUser(AbstractUser):
    email = models.EmailField(unique=True)

    USERNAME_FIELD = "email"         # 👈 login with email
    REQUIRED_FIELDS = ["username"]   # 👈 still require username for createsuperuser

    objects = CustomUserManager()

    def __str__(self):
        return f"{self.username} ({self.email})"
