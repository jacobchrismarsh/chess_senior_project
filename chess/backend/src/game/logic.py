from typing import List, Tuple

from django.core.handlers.wsgi import WSGIRequest
from django.http.response import JsonResponse
from django.shortcuts import render
from .context import pychess
from .context import Stockfish
from pychess.Utils.Board import Board
from pychess.Utils.lutils.lmovegen import genAllMoves, newMove
from pychess.Utils.lutils.lmove import parseAny
from pychess.Utils.Move import Move, listToMoves
from pychess.Utils.const import KING_CASTLE, QUEEN_CASTLE, BLACK, WHITE, cordDic

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
    board = _get_board(request)
    from_coord = int(request.GET.get("index"))

    potential_moves = _get_potential_board_moves(from_coord, board)

    all_legal_moves = [Move(move) for move in genAllMoves(board.board)]

    legal_destinations = _get_legal_destinations(potential_moves, all_legal_moves)

    return JsonResponse({"moves": legal_destinations})


def _get_board(request: WSGIRequest) -> Board:
    """ This will eventually be fleshed out into accessing the Database """
    global global_board
    return global_board


def _get_potential_board_moves(from_coord: int, board: Board) -> List[Move]:
    """ Given a piece at location 'from_coord', list every possible move it could
        make, legal and illegal alike
    """
    potential_moves_coordinates = [(from_coord, to_coord) for to_coord in range(64)]
    potential_moves = [_get_move(*coords) for coords in potential_moves_coordinates]
    return potential_moves


def _get_legal_destinations(
    potential_moves: List[Move], all_legal_moves: List[Move]
) -> List[int]:
    legal_moves_for_piece = [
        move for move in potential_moves if move in all_legal_moves
    ]

    return [_move_to_board_location(move)[TO_COORD] for move in legal_moves_for_piece]


def _move_to_board_location(move: Move) -> Tuple[int]:
    """ Takes a move and returns a single tuple of ints, 0-63, representing a FROM and
        TO position.
    """
    from_coord = move.cord0.y * BOARD_WIDTH + move.cord0.x
    to_coord = move.cord1.y * BOARD_WIDTH + move.cord1.x
    return (from_coord, to_coord)


def make_move(request: WSGIRequest) -> JsonResponse:
    player_color = WHITE
    board = _get_board(request)
    from_coord, to_coord = _get_coords_from_wsgi_request(request)
    pieces_moved = [{"from_coord": from_coord, "to_coord": to_coord}]

    player_move = _get_move(from_coord, to_coord)

    pieces_moved += _check_for_castle(player_move, player_color)

    global_board = board.move(player_move)
    return JsonResponse({"moves": pieces_moved})


def _get_move(from_coord, to_coord) -> Move:
    move = Move(newMove(from_coord, to_coord))
    move = Move(move.cord0, move.cord1, global_board)
    return move


def _check_for_castle(move: Move, color: int) -> List[Dict[int, int]]:
    return _black_check_castle(move) if color == BLACK else _white_check_castle(move)


def _black_check_castle(move: Move) -> List[Dict[str, int]]:
    if move.flag == QUEEN_CASTLE:
        from_coord, to_coord = cordDic["a8"], cordDic["d8"]
        return [{"from_coord": from_coord, "to_coord": to_coord}]
    elif move.flag == KING_CASTLE:
        from_coord, to_coord = cordDic["h8"], cordDic["f8"]
        return [{"from_coord": from_coord, "to_coord": to_coord}]
    return []


def _white_check_castle(move: Move) -> List[Dict[int, int]]:
    if move.flag == QUEEN_CASTLE:
        from_coord, to_coord = cordDic["a1"], cordDic["d1"]
        return [{"from_coord": from_coord, "to_coord": to_coord}]
    elif move.flag == KING_CASTLE:
        from_coord, to_coord = cordDic["h1"], cordDic["f1"]
        return [{"from_coord": from_coord, "to_coord": to_coord}]
    return []


def _get_opponent_move():
    global global_board
    stockfish_color = BLACK

    engine = initialize_stockfish_engine()
    _set_chess_engine_board_fen_position(engine, global_board)

    best_move_as_san = engine.get_best_move()
    stockfish_move = _convert_SAN_str_to_move(best_move_as_san)

    global_board = global_board.move(stockfish_move)

    from_coord, to_coord = _move_to_board_location(stockfish_move)
    pieces_moved = [{"from_coord": from_coord, "to_coord": to_coord}]
    pieces_moved += _check_for_castle(stockfish_move, stockfish_color)

    return JsonResponse({"moves": pieces_moved})


def _get_coords_from_wsgi_request(request: WSGIRequest) -> Tuple[int, int]:
    from_coord = int(request.GET.get("from_coord"))
    to_coord = int(request.GET.get("to_coord"))

    return (from_coord, to_coord)


def initialize_stockfish_engine() -> Stockfish:
    return Stockfish(STOCKFISH_ENGINE_LOC)


def _set_chess_engine_board_fen_position(engine: Stockfish, board: Board) -> None:
    engine.set_fen_position(board.asFen())


def _convert_SAN_str_to_move(san: str) -> Move:
    move = Move(parseAny(global_board.board, san))
    from_coord, to_coord = _move_to_board_location(move)
    move = _get_move(from_coord, to_coord)
    return move
