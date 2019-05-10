from typing import Tuple

from django.core.handlers.wsgi import WSGIRequest
from django.http.response import JsonResponse
from django.shortcuts import render
from .context import pychess
from .context import Stockfish
from pychess.Utils.Board import Board
from pychess.Utils.lutils.lmovegen import genAllMoves, newMove
from pychess.Utils.lutils.lmove import parseAny
from pychess.Utils.Move import Move

FROM_COORD = 0
TO_COORD = 1
BOARD_WIDTH = 8
STOCKFISH_ENGINE_LOC = "../../../mac_stockfish/stockfish-10-mac/Mac/stockfish-10-64"


global_board = Board(setup=True)

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
    from_coord = int(request.GET.get("index"))

    potential_moves = [Move(newMove(from_coord, to_coord)) for to_coord in range(64)]

    all_legal_moves = [Move(move) for move in genAllMoves(global_board.board)]

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

def make_move(request: WSGIRequest) -> JsonResponse:
    global global_board
    from_coord, to_coord = _get_coords_from_wsgi_request(request)

    player_move = Move(newMove(from_coord, to_coord))

    global_board = global_board.move(player_move)
    return _get_opponent_move()

def _get_opponent_move():
    global global_board

    engine = initialize_stockfish_engine()
    _set_chess_engine_board_fen_position(engine, global_board)

    best_move_as_san = engine.get_best_move()
    stockfish_move = _convert_SAN_str_to_move(best_move_as_san)

    global_board = global_board.move(stockfish_move)

    from_coord, to_coord = _move_to_board_location(stockfish_move)

    return JsonResponse({"from_coord": from_coord, "to_coord": to_coord})

def _get_coords_from_wsgi_request(request: WSGIRequest) -> Tuple[int, int]:
    from_coord = int(request.GET.get("from_coord"))
    to_coord = int(request.GET.get("to_coord"))

    return (from_coord, to_coord)

def initialize_stockfish_engine() -> Stockfish:
    return Stockfish(STOCKFISH_ENGINE_LOC)

def _set_chess_engine_board_fen_position(engine: Stockfish, board: Board) -> None:
    engine.set_fen_position(board.asFen())

def _convert_SAN_str_to_move(san: str) -> Move:
    return Move(parseAny(global_board.board, san))
