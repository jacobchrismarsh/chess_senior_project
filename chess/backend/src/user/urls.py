from django.urls import path
from . import user

urlpatterns = [
    path("new_user/", user.create_user, name="create-user"),
    path("login/", user.login_user, name="login-user"),
    path("logout/", user.logout_user, name="logout-user"),
]
