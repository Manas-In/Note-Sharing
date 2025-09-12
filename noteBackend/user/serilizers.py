# from django.contrib.auth.models import User
# from .models import CustomUser
# from rest_framework import serializers
# from rest_framework.decorators import api_view

# class UserSerilizer(serializers.ModelSerializer):
#     class Meta:
#        model = CustomUser
#        fields = ['first_name', 'last_name', 'email', 'password' ]
#        extra_kwargs = {
#             'password': {'write_only': True}
#         }
       
#     def create(self, validated_data):
#         user = CustomUser(
#             first_name=validated_data['first_name'],
#             last_name=validated_data['last_name'],
#             email=validated_data['email'],
#         )
#         user.set_password(validated_data['password'])  # ✅ hash password
#         user.save()
#         return user

#     def update(self, instance, validated_data):
#         instance.first_name = validated_data.get('first_name', instance.first_name)
#         instance.last_name = validated_data.get('last_name', instance.last_name)
#         instance.username = validated_data.get('username', instance.username)
#         instance.email = validated_data.get('email', instance.email)

#         password = validated_data.get('password', None)
#         if password:
#             instance.set_password(password)  # ✅ hash new password if provided

#         instance.save()
#         return instance
# '''
#  "id": 1,
#         "password": "pbkdf2_sha256$1000000$N6DEXT533V5TUF4Kcr6v7w$vxVZug9Cv8b4s7ORFWwM/nJyYEKcUuewbFcU92IFmoI=",
#         "last_login": "2025-09-02T14:34:40.188681Z",
#         "is_superuser": true,
#         "username": "manas",
#         "first_name": "",
#         "last_name": "",
#         "email": "manas@gmail.com",
#         "is_staff": true,
#         "is_active": true,
#         "date_joined": "2025-08-06T07:05:56.456206Z",
#         "groups": [],
#         "user_permissions": []
# # '''



from rest_framework import serializers
from .models import CustomUser


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = CustomUser
        fields = ["id", "username", "first_name", "last_name", "email", "password"]

    def create(self, validated_data):
        password = validated_data.pop("password")
        user = CustomUser.objects.create_user(password=password, **validated_data)
        return user
