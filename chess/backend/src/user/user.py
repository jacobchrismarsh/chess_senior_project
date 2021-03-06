from django.contrib.auth.models import User
from rest_framework.request import Request
from rest_framework_jwt.authentication import JSONWebTokenAuthentication


def get_user_info(request: Request) -> User:
    return JSONWebTokenAuthentication().authenticate(Request(request))[0]
