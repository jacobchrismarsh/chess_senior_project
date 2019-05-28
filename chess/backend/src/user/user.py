from django.contrib.auth.models import User
from django.core.handlers.wsgi import WSGIRequest
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login, logout


def create_user(request: WSGIRequest) -> JsonResponse:
    username = request.GET.get("username")
    password = request.GET.get("password")
    email = request.GET.get("email")
    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()
    return JsonResponse({"status": "success"})


def authenticate_user(request: WSGIRequest) -> JsonResponse:
    username = request.GET.get("username")
    password = request.GET.get("password")
    user = authenticate(username=username, password=password)

    if user is not None:
        login(request, user)
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse({"status": "failure"})


def logout_user(request: WSGIRequest) -> JsonResponse:
    logout(request)
    return JsonResponse({"status": "success"})
