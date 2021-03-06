from django.urls import path
from . import logic

urlpatterns = [
    path("", logic.create_chess_game, name="gaston-is-wrong"),
    path("create/", logic.create_chess_game, name="create-game"),
    path("get_moves/", logic.get_all_moves, name="get_all_moves"),
    path("make_move/", logic.make_move, name="make_move"),
    path("get_opponent_move/", logic.get_opponent_move, name="get_opponent_move"),
    path("get_current_games/", logic.get_current_games, name="get_current_games"),
    path("get_game_info/", logic.get_game_info, name="get_current_games"),
]
