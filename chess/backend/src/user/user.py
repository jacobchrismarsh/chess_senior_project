from django.contrib.auth.models import User
from django.core.handlers.wsgi import WSGIRequest
from django.http.response import JsonResponse
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponseRedirect


@csrf_exempt
def create_user(request: WSGIRequest) -> JsonResponse:
    username = request.POST.get("username")
    password = request.POST.get("password")
    email = request.POST.get("email")
    print(username, password, email)
    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()
    return JsonResponse({"status": "success"})


@csrf_exempt
def login_user(request: WSGIRequest) -> JsonResponse:
    user = authenticate_user(request)

    if user is not None:
        login(request, user)
        return JsonResponse({"status": "success"})
    else:
        return JsonResponse(
            {"status": "failure", "error": "Invalid username or password"}
        )


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
