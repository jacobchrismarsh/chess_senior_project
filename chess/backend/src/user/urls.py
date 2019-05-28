from django.urls import path
from . import logic

urlpatterns = [
    path("new_user/", logic.create_chess_game, name="create-game"),
]
