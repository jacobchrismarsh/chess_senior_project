from typing import Dict
from game.game import GameState
from game.models import Games
from move.models import Moves

INITIAL_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
WHITE = "White"
BLACK = "Black"

class MoveState:
    def __init__(self):
        self.white_user_id: int
        self.black_user_id: int
        self.move_number: int
        self.pre_move_fen: str
        self.post_move_fen: str
        self.move_algebraic: str
        self.game_id: int
        self.turn: str

    def set_state_from_prev_move(prev_move: Moves):
        self.white_user_id = prev_move.white_user_id
        self.black_user_id = prev_move.black_user_id
        self.move_number = prev_move.move_number + 1
        self.pre_move_fen = prev_move.post_move_fen
        self.game_id = prev_move.game_id
        self.turn = WHITE if prev_move.turn == BLACK else BLACK

    def set_state_from_game(game: GameState):
        self.white_user = game.white_user_id
        self.black_user = game.black_user_id

    def set_initial(self, game: Games):
        self.white_user_id = game.white_user_id
        self.black_user_id = game.black_user_id
        self.move_number = 0
        self.pre_move_fen = INITIAL_FEN
        self.post_move_fen = INITIAL_FEN
        self.move_algebraic = ""
        self.game_id = game
        self.turn = WHITE

    def set_fen(pre: str, post: str):
        self.pre_move_fen = pre
        self.post_move_fen = post

    def set_move(move: str):
        self.move_algebraic = move

    def set_game_id(id: int):
        self.game_id = id

    def items(self) -> Dict:
        return self.__dict__
