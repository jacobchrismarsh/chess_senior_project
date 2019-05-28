from django.urls import path
from . import user

urlpatterns = [
    path("new_user/", user.create_user, name="create-user"),
    path("authenticate_user/", user.authenticate_user, name="authenticate-user"),
    path("logout_user/", user.logout_user, name="logout-user"),
]
