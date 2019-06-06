import json
from typing import Dict
from django.contrib.auth.models import User
from django.core.handlers.wsgi import WSGIRequest
from user.user import get_user_info

AI = "Computer"
AI_ID = 0
BLACK = "Black"
WHITE = "White"


class GameState:
    def __init__(self, request: WSGIRequest):
        self.user_id_1: int
        self.user_id_2: int
        self.white_user_id: int
        self.black_user_id: int
        self.difficulty: int
        self.ongoing: bool

        self.ongoing = True
        self.set_state(request)

    def set_state(self, request: WSGIRequest) -> None:
        user = get_user_info(request)
        self.set_user_ids(user.id, self._get_user_id_or_computer(request))
        self.set_colors(request)
        self.set_difficulty(request)

    def set_user_ids(self, user_id_1, user_id_2) -> None:
        self.user_id_1 = user_id_1
        self.user_id_2 = user_id_2

    def _get_user_id_or_computer(self, request: WSGIRequest) -> int:
        info = json.loads(request.body)
        opponent = info.get("opponent")
        if opponent == AI:
            return AI_ID
        user = User.objects.get(username=opponent)
        return user.id

    def set_colors(self, request: WSGIRequest) -> None:
        info = json.loads(request.body)
        if info.get("color") == WHITE:
            self.white_user_id = self.user_id_1
            self.black_user_id = self.user_id_2
        else:
            self.white_user_id = self.user_id_2
            self.black_user_id = self.user_id_1

    def set_difficulty(self, request: WSGIRequest) -> None:
        info = json.loads(request.body)
        difficulty = info.get("difficulty")
        self.difficulty = difficulty

    def items(self) -> Dict:
        return self.__dict__

