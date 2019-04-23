from django.shortcuts import render
from django.http.response import JsonResponse

def create_chess_game(request: WSGIRequest) -> JsonResponse:
    """
        Takes the appropriate information from `request` and creates a new
        chess game

        Relevant attributes:
            user_id_1: str
            user_id_2: str
            white_user_id: str
            black_user_id: str
            id: int
    """
    return JsonResponse(json.dumps([1, 2, 3]))

def get_all_moves(request: WSGIRequest) -> JsonResponse:
    return JsonResponse(json.dumps([1, 2, 3]))
