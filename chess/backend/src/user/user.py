from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.core.handlers.wsgi import WSGIRequest
from django.db import IntegrityError
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def create_user(request: WSGIRequest) -> JsonResponse:
    username = request.POST.get("username")
    password = request.POST.get("password")
    email = request.POST.get("email")

    status = "success"
    error = ""

    try:
        user = User.objects.create_user(
            username=username, password=password, email=email
        )
    except IntegrityError:
        status = "failure"
        error = "That username is already taken"

    return JsonResponse({"status": status, "error": error})


@csrf_exempt
def login_user(request: WSGIRequest) -> JsonResponse:
    user = authenticate_user(request)

    if user is not None:
        login(request, user)
        return HttpResponseRedirect("http://localhost:3000/dashboard/")
    else:
        return JsonResponse({"status": "failure"})


@csrf_exempt
def authenticate_user(request: WSGIRequest) -> User:
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(username=username, password=password)
    return user


def logout_user(request: WSGIRequest) -> JsonResponse:
    logout(request)
    return JsonResponse({"status": "success"})


def is_logged_in(request: WSGIRequest) -> JsonResponse:
    return JsonResponse({"status": request.user.is_authenticated})
