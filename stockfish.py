""" All UCI documentation here: http://wbec-ridderkerk.nl/html/UCIProtocol.html """

import subprocess
from typing import Dict, List, Optional, Union


class Stockfish:
    """ Integrates the Stockfish chess engine with Python. """

    def __init__(
        self, path: str = None, depth: int = 2, param: Dict[str, Union[str, int]] = None
    ):
        if param is None:
            param = {}
        if path is None:
            path = "stockfish"
        self.stockfish = subprocess.Popen(
            path, universal_newlines=True, stdin=subprocess.PIPE, stdout=subprocess.PIPE
        )
        self.depth = str(depth)

        # Tell the engine to use the UCI format
        self.__put("uci")

        default_param = {
            "Write Debug Log": "false",
            "Contempt": 0,
            "Min Split Depth": 0,
            "Threads": 1,
            "Ponder": "false",
            "Hash": 16,
            "MultiPV": 1,
            "Skill Level": 20,
            "Move Overhead": 30,
            "Minimum Thinking Time": 20,
            "Slow Mover": 80,
            "UCI_Chess960": "false",
        }

        default_param.update(param)
        self.param = default_param
        for name, value in list(default_param.items()):
            self.__set_option(name, value)

        self.__start_new_game()

    def change_thinking_time(milliseconds: int) -> None:
        """ Changes the thinking time of the chess engine in milliseconds """
        self.__set_option("Minimum Thinking Time", milliseconds)

    def change_difficulty(self, difficulty: int) -> None:
        """ Changes the difficulty of the engine, STILL UNSURE WHAT THIS MEANS """
        self.__set_option("Skill Level", difficulty)

    def __start_new_game(self) -> None:
        self.__put("ucinewgame")
        self.__isready()

    def __put(self, command: str) -> None:
        """ Internal function for writing commands to the engine """
        self.stockfish.stdin.write(command + "\n")
        self.stockfish.stdin.flush()

    def __set_option(self, optionname: str, value: Union[str, int]) -> None:
        """ Will set an option in the chess engine """
        self.__put("setoption name %s value %s" % (optionname, str(value)))
        stdout = self.__isready()
        if stdout.find("No such") >= 0:
            print("Unable to set option %s" % optionname)

    def __isready(self) -> str:
        """ Tests to see if the engine is ready to go """
        self.__put("isready")
        while True:
            text = self.stockfish.stdout.readline().strip()
            if text == "readyok":
                return text

    def __go(self):
        """ will search through the number of plies designated by self.depth"""
        self.__put("go depth %s" % self.depth)

    @staticmethod
    def __convert_move_list_to_str(moves: List[str]) -> str:
        result = ""
        for move in moves:
            result += move + " "
        return result.strip()

    def set_position(self, moves: List[str] = None) -> None:
        """ Sets current board positions.

            Args:
                moves: A list of moves to set this position on the board.
                    Must be in full algebraic notation.
                    example:
                    ['e2e4', 'e7e5']
        """
        if moves is None:
            moves = []
        self.__put(
            "position startpos moves %s" % self.__convert_move_list_to_str(moves)
        )

    def set_fen_position(self, fen_position: str) -> None:
        """ Set the board game using FEN notation """
        self.__put("position fen " + fen_position)

    def get_best_move(self) -> Optional[str]:
        """ Get best move with current position on the board.

            Returns:
                A string of moves in algebraic notation or None, if it's a checkmate.
        """
        self.__go()
        while True:
            text = self.stockfish.stdout.readline().strip()
            split_text = text.split(" ")
            if split_text[0] == "bestmove":
                if split_text[1] == "(none)":
                    return None
                return split_text[1]

    def is_move_correct(self, move_value: str) -> bool:
        """ Checks new move.

            Args:
                move_value: New move value in algebraic notation.

            Returns:
                True, if new move is correct, else False.
        """
        self.__put("go depth 1 searchmoves %s" % move_value)
        while True:
            text = self.stockfish.stdout.readline().strip()
            split_text = text.split(" ")
            if split_text[0] == "bestmove":
                if split_text[1] == "(none)":
                    return False
                return True

    def __del__(self) -> None:
        """ Ends the stockfish program """
        self.stockfish.kill()
