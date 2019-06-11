import time
from typing import List, Dict, Tuple

from django.contrib.auth.models import User
from django.core.handlers.wsgi import WSGIRequest
from django.db.models import Q
from django.http import HttpResponseRedirect
from django.http.response import JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .context import pychess
from .context import Stockfish
from user.user import get_user_info
from pychess.Utils.Board import Board
from pychess.Utils.Cord import Cord
from pychess.Utils.lutils.lmovegen import genAllMoves, newMove
from pychess.Utils.lutils.lmove import parseAny
from pychess.Utils.logic import legalMoveCount, getStatus
from pychess.Utils.Move import Move, listToMoves, parseSAN, toSAN
from pychess.Utils.const import (
    KING_CASTLE,
    QUEEN_CASTLE,
    BLACK,
    WHITE,
    cordDic,
    WHITEWON,
    BLACKWON,
)
from game.game import GameState
from game.models import Games
from move.models import Moves
from move.move import MoveState
from user.user import get_user_info

FROM_COORD = 0
TO_COORD = 1
BOARD_WIDTH = 8
STOCKFISH_ENGINE_LOC = "../../../mac_stockfish/stockfish-10-mac/Mac/stockfish-10-64"
# STOCKFISH_ENGINE_LOC = "./mac_stockfish/stockfish-10-mac/Mac/stockfish-10-64"
ONLINE_OPPONENT = "Online Opponent"
AI = "Computer"
AI_ID = 0
WHITE_STR = "White"
BLACK_STR = "Black"


global_board = Board(setup=True)


@csrf_exempt
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
    game_state = GameState(request)
    game = Games.objects.create(**game_state.items())
    initial_move = MoveState()
    initial_move.set_initial(game)
    add_move_state_to_database(initial_move)
    return JsonResponse({"status": "success", "game_id": game.id})


def get_all_moves(request: WSGIRequest) -> JsonResponse:
    board = _get_board(request)
    from_coord = int(request.GET.get("index"))

    potential_moves = _get_potential_board_moves(from_coord, board)

    all_legal_moves = [Move(move) for move in genAllMoves(board.board)]

    legal_destinations = _get_legal_destinations(potential_moves, all_legal_moves)

    return JsonResponse({"moves": legal_destinations})


def _get_board(request: WSGIRequest) -> Board:
    """ This will eventually be fleshed out into accessing the Database """
    game_id = request.GET.get("game_id")

    most_recent_move = _get_most_recent_move(game_id)
    most_recent_move.refresh_from_db()

    game_board = Board(setup=most_recent_move.post_move_fen)

    return game_board


def _get_potential_board_moves(from_coord: int, board: Board) -> List[Move]:
    """ Given a piece at location 'from_coord', list every possible move it could
        make, legal and illegal alike
    """
    potential_moves_coordinates = [(from_coord, to_coord) for to_coord in range(64)]
    potential_moves = [
        _get_move(*coords, board) for coords in potential_moves_coordinates
    ]
    potential_moves = [
        move for move in potential_moves if not board.board.willLeaveInCheck(move.move)
    ]
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
    game_id = request.GET.get("game_id")
    most_recent_move = _get_most_recent_move(game_id)

    user = get_user_info(request)
    player_color = WHITE if most_recent_move.white_user_id == user.id else BLACK

    board = _get_board(request)
    from_coord, to_coord = _get_coords_from_wsgi_request(request)
    pieces_moved = [{"from_coord": from_coord, "to_coord": to_coord}]

    player_move = _get_move(from_coord, to_coord, board)

    pieces_moved += _check_for_castle(player_move, player_color)

    board = board.move(player_move)
    record_move(board, player_move, game_id)

    return JsonResponse({"moves": pieces_moved, "winner": check_if_game_over(board)})


def _get_move(from_coord, to_coord, board: Board) -> Move:
    move = Move(newMove(from_coord, to_coord))
    move = Move(move.cord0, move.cord1, board)
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


def check_if_game_over(board: Board) -> str:
    winner = ""
    status, _ = getStatus(board)
    if status == WHITEWON:
        winner = WHITE_STR
    elif status == BLACKWON:
        winner = BLACK_STR
    return winner


def get_opponent_move(request: WSGIRequest) -> JsonResponse:
    if _opponent_is_ai(request):  # Player is AI
        return get_ai_move(request)
    return wait_for_human_opponents_move(request)


def _opponent_is_ai(request: WSGIRequest) -> bool:
    game_id = request.GET.get("game_id")
    game = Games.objects.get(id=game_id)
    return game.user_id_1 == AI_ID or game.user_id_2 == AI_ID


def get_ai_move(request: WSGIRequest):
    game_id = request.GET.get("game_id")
    difficulty = get_difficulty_from_game(game_id)
    most_recent_move = _get_most_recent_move(game_id)
    board = _get_board(request)
    stockfish_color = BLACK if most_recent_move.black_user_id == AI_ID else WHITE

    engine = initialize_stockfish_engine(difficulty)
    _set_chess_engine_board_fen_position(engine, board)

    best_move_as_san = engine.get_best_move()
    most_recent_move = _get_most_recent_move(game_id)

    stockfish_move = _convert_SAN_str_to_move(best_move_as_san, board)

    board = board.move(stockfish_move)
    record_move(board, stockfish_move, game_id)

    from_coord, to_coord = _move_to_board_location(stockfish_move)
    pieces_moved = [{"from_coord": from_coord, "to_coord": to_coord}]
    pieces_moved += _check_for_castle(stockfish_move, stockfish_color)

    return JsonResponse({"moves": pieces_moved, "winner": check_if_game_over(board)})

def wait_for_human_opponents_move(request: WSGIRequest) -> JsonResponse:
    game_id = request.GET.get("game_id")
    color_were_waiting_for = request.GET.get("color")

    most_recent_move = _get_most_recent_move(game_id)
    while most_recent_move.turn != color_were_waiting_for:
        most_recent_move = _get_most_recent_move(game_id)
        time.sleep(.2)

    return figure_out_previously_moved_pieces(game_id)

def figure_out_previously_moved_pieces(request: WSGIRequest) -> JsonResponse:
    opponent_color = WHITE if request.GET.get("color") == WHITE_STR else BLACK
    most_recent_move = _get_most_recent_move(game_id)
    # old_board = Board(setup=most_recent_move.pre_move_fen)

    old_move = _convert_SAN_str_to_move(most_recent_move.move_algebraic)
    # current_board = old_board.move(old_move)

    from_coord, to_coord = _move_to_board_location(old_move)
    pieces_moved = [{"from_coord": from_coord, "to_coord": to_coord}]
    pieces_moved += _check_for_castle(old_move, request.GET.get("color"))
    return JsonResponse({"moves": pieces_moved})

def _get_coords_from_wsgi_request(request: WSGIRequest) -> Tuple[int, int]:
    from_coord = int(request.GET.get("from_coord"))
    to_coord = int(request.GET.get("to_coord"))

    return (from_coord, to_coord)


def initialize_stockfish_engine(difficulty: int) -> Stockfish:
    engine = Stockfish(STOCKFISH_ENGINE_LOC)
    engine.change_difficulty(difficulty)
    return engine


def get_difficulty_from_game(game_id: int) -> int:
    game = Games.objects.get(id=game_id)
    return game.difficulty


def _set_chess_engine_board_fen_position(engine: Stockfish, board: Board) -> None:
    engine.set_fen_position(board.asFen())


def _convert_SAN_str_to_move(san: str, board: Board) -> Move:
    move = Move(parseAny(global_board.board, san))
    from_coord, to_coord = _move_to_board_location(move)
    move = _get_move(from_coord, to_coord, board)
    return move


def _get_most_recent_move(game_id: int) -> Moves:
    moves = Moves.objects.filter(game_id_id=game_id)  # Django has weird name-mangling
    return moves.order_by("-move_number")[0]


def record_move(board: Board, move: Move, game_id: int):
    most_recent_move = _get_most_recent_move(game_id)
    move_state = MoveState()
    move_state.set_state_from_prev_move(most_recent_move)
    move_state.post_move_fen = board.asFen()
    move_state.set_move(toSAN(board, move))
    add_move_state_to_database(move_state)


def add_move_state_to_database(move: MoveState):
    new_move = Moves.objects.create(**move.items())
    new_move.save()


def get_current_games(request: WSGIRequest) -> JsonResponse:
    user = get_user_info(request)
    all_games = Games.objects.filter(Q(user_id_1=user.id) | Q(user_id_2=user.id))

    active_games = all_games.filter(ongoing=1)
    game_list = []
    for game in active_games:
        game_list.append(build_game_status_dict(game, user))

    return JsonResponse({"games": game_list})


def build_game_status_dict(game: Games, user: User) -> Dict[str, str]:
    most_recent_move = _get_most_recent_move(game.id)

    opponent_id = (
        game.black_user_id if game.white_user_id == user.id else game.white_user_id
    )
    if opponent_id == AI_ID:
        opponent = AI
    else:
        opponent = f"Online Player - {opponent_id}"

    return {
        "id": game.id,
        "color": WHITE_STR if game.white_user_id == user.id else BLACK_STR,
        "turn": BLACK_STR if most_recent_move.turn == WHITE_STR else WHITE_STR,
        "count": most_recent_move.move_number,
        "opponent": opponent,
    }


def get_game_info(request: WSGIRequest) -> JsonResponse:
    game_id = request.GET.get("game_id")
    user = get_user_info(request)
    board = _get_board(request)
    most_recent_move = _get_most_recent_move(game_id)

    return JsonResponse(
        {
            "fen": most_recent_move.post_move_fen,
            "captured_white_pieces": [],
            "captured_black_pieces": [],
            "turn": WHITE_STR if most_recent_move.turn == BLACK_STR else WHITE_STR,
            "count": most_recent_move.move_number,
            "your_color": WHITE_STR
            if most_recent_move.white_user_id == user.id
            else BLACK_STR,
        }
    )
