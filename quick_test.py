from typing import Tuple

from pychess.Utils.Board import Board
from pychess.Utils.lutils.lmovegen import genAllMoves, newMove
from pychess.Utils.lutils.validator import validateMove
from pychess.Utils.Move import Move, toSAN, toLAN

BOARD_WIDTH = 8

board = Board(setup=True)
print(board)
move = next(genAllMoves(board.board))

move = Move(move)


def _translate_move_to_board_location(move: Move) -> Tuple[int]:
    """ Takes a move and returns a single tuple of ints, 0-63, representing a
        board position.
    """
    from_coord = move.cord0.y * BOARD_WIDTH + move.cord0.x
    to_coord = move.cord1.y * BOARD_WIDTH + move.cord1.x
    print(move.cord1.__dict__)
    return (from_coord, to_coord)


move2 = Move(newMove(0, 1))
print(validateMove(board.board, move2))

print(_translate_move_to_board_location(move2))

print(toLAN(board, move2))
# print(move.cords[1].__dict__)
# print(move.cords[0].cy)
