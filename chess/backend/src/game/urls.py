from django.urls import path
from . import logic

urlpatterns = [
    path("", logic.create_chess_game, name="gaston-is-wrong"),
    path("create/", logic.create_chess_game, name="create-game"),
]
