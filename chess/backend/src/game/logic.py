from typing import Tuple

from django.core.handlers.wsgi import WSGIRequest
from django.http.response import JsonResponse
from django.shortcuts import render
from .context import pychess
from pychess.Utils.Board import Board
from pychess.Utils.lutils.lmovegen import genAllMoves, newMove
from pychess.Utils.Move import Move

FROM_COORD = 0
TO_COORD = 1
BOARD_WIDTH = 8


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
    newBoard = Board(setup=True)
    return JsonResponse({1: 2})


def get_all_moves(request: WSGIRequest) -> JsonResponse:
    from_coord = request.index

    potential_moves = [Move(newMove(from_coord, to_coord)) for to_coord in range(64)]

    all_legal_moves = genAllMoves(board.board)

    legal_moves_for_piece = [
        move for move in potential_moves if move in all_legal_moves
    ]

    legal_destinations = [
        _move_to_board_location(move)[TO_COORD] for move in legal_moves_for_piece
    ]

    return JsonResponse({"moves": legal_destinations})


def _move_to_board_location(move: Move) -> Tuple[int]:
    """ Takes a move and returns a single tuple of ints, 0-63, representing a FROM and
        TO position.
    """
    from_coord = move.cord0.y * BOARD_WIDTH + move.cord0.x
    to_coord = move.cord1.y * BOARD_WIDTH + move.cord1.x
    return (from_coord, to_coord)
