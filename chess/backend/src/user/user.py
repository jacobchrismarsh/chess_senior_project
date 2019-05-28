from django.db import models
from django.contrib.auth.models import User


class UserProfile(models.Model):
    user = models.ForeignKey(User, unique=True)
    player_id = models.AutoField()


def create_user(request: WSGIRequest) -> JsonResponse:
    username = request.GET.get("username")
    password = request.GET.get("password")
    email = request.GET.get("email")
    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()
    return JsonResponse({"status": "success"})
