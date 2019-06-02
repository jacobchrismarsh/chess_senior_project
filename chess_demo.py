from stockfish import Stockfish as s

engine = s(
    "/Users/jacobmarshall/CalPoly/senior/chess_senior_project/mac_stockfish/"
    "stockfish-10-mac/Mac/stockfish-10-64"
)

# Set game to starting position
engine.set_fen_position("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")

print(engine.get_best_move())

