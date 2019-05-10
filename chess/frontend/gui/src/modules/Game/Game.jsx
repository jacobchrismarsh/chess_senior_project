import React from "react";
import autoBind from 'react-autobind';
import { Board, LeftSidebar, RightSidebar } from "./subcomponents";
import {
  Pawn,
  Knight,
  Rook,
  Bishop,
  Queen,
  King,
  Empty
} from "./subcomponents/Pieces";
import {
  NOT_SELECTED,
  BLACK_PAWN_INIT,
  WHITE_PAWN_INIT,
  BLACK_KNIGHT_INIT,
  WHITE_KNIGHT_INIT,
  BLACK_ROOK_INIT,
  WHITE_ROOK_INIT,
  BLACK_BISHOP_INIT,
  WHITE_BISHOP_INIT,
  BLACK_QUEEN_INIT,
  WHITE_QUEEN_INIT,
  BLACK_KING_INIT,
  WHITE_KING_INIT,
  WHITE,
  BLACK,
  TRANSLATE_POSITION
} from "./constants";

import $ from "jquery";
import "./game.css";

export default class Game extends React.Component {
  constructor(props) {
    super();
    this.state = {
      squares: this.initBoard(),
      selected: NOT_SELECTED,
      capturedWhitePieces: [],
      capturedBlackPieces: [],
      turn: WHITE,
      count: 0,
      error: "",
      movableSquares: []
    };

    autoBind(this);
  }

  initBoard() {
    // Not using a 2D array just for simplicity
    let squares = Array(64).fill(null);

    // // Initiailizing the 'Black' Pawns
    for (let i = 0; i < BLACK_PAWN_INIT.length; i++) {
      squares[BLACK_PAWN_INIT[i]] = new Pawn(BLACK);
    }

    // Initializing the 'White' Pawns
    for (let i = 0; i < WHITE_PAWN_INIT.length; i++) {
      squares[WHITE_PAWN_INIT[i]] = new Pawn(WHITE);
    }

    // Initializing the 'Black' Knights
    for (let i = 0; i < BLACK_KNIGHT_INIT.length; i++) {
      squares[BLACK_KNIGHT_INIT[i]] = new Knight(BLACK);
    }

    // Initializing the 'White' Knights
    for (let i = 0; i < WHITE_KNIGHT_INIT.length; i++) {
      squares[WHITE_KNIGHT_INIT[i]] = new Knight(WHITE);
    }

    // Initializing the 'Black' Rooks
    for (let i = 0; i < BLACK_ROOK_INIT.length; i++) {
      squares[BLACK_ROOK_INIT[i]] = new Rook(BLACK);
    }

    // Initialzigin the 'White' Rooks
    for (let i = 0; i < WHITE_ROOK_INIT.length; i++) {
      squares[WHITE_ROOK_INIT[i]] = new Rook(WHITE);
    }

    // Initializing the 'Black' Bishops
    for (let i = 0; i < BLACK_BISHOP_INIT.length; i++) {
      squares[BLACK_BISHOP_INIT[i]] = new Bishop(BLACK);
    }

    // Initializing the 'White' Bishops
    for (let i = 0; i < WHITE_BISHOP_INIT.length; i++) {
      squares[WHITE_BISHOP_INIT[i]] = new Bishop(WHITE);
    }

    // Initializing the 'Black' Queen
    for (let i = 0; i < BLACK_QUEEN_INIT.length; i++) {
      squares[BLACK_QUEEN_INIT[i]] = new Queen(BLACK);
    }
    // Initializing the 'White' Queen
    for (let i = 0; i < WHITE_QUEEN_INIT.length; i++) {
      squares[WHITE_QUEEN_INIT[i]] = new Queen(WHITE);
    }

    // Initialzing the 'Black' King
    for (let i = 0; i < BLACK_KING_INIT.length; i++) {
      squares[BLACK_KING_INIT[i]] = new King(BLACK);
    }

    // Initializing the 'White' King
    for (let i = 0; i < WHITE_KING_INIT.length; i++) {
      squares[WHITE_KING_INIT[i]] = new King(WHITE);
    }

    for (let i = 0; i < 64; i++) {
      if (squares[i] === null) {
        squares[i] = new Empty(null);
      }
    }

    return squares;
  }

  // returns a boolean indication whether a move is valid
  checkIfMoveValid(index) {
    return this.state.squares[index].movable;
  }

  // returns the color of the opponent
  opponentColor() {
    return this.state.turn === WHITE ? BLACK : WHITE;
  }

  // sets the error message to the string that is passed in
  setError(message) {
    this.setState({
      error: message
    });
  }

  // returns true if the square at spot index belongs to the current player
  checkIfPieceBelongsToCurrentPlayer(index) {
    return this.state.squares[index].player === this.state.turn;
  }

  // returns true if the square at the spot index belongs to the opponent player
  checkIfPieceBelongsToOpponentPlayer(index) {
    return this.state.squares[index].player === this.opponentColor();
  }

  // returns true if the square at spot index is already selected
  checkIfSelectedPieceIsAlreadySelected(index) {
    return this.state.selected === index;
  }

  // returns true if the square at spot index is empty
  checkIfSelectedIsEmpty(index) {
    return this.state.squares[index].player === null;
  }

  // highlights the squares on the board that are 'movable' according
  // to the response from the server
  highlightMoves(moves) {
    let newSquares = this.state.squares;

    moves.forEach(move => {
      newSquares[TRANSLATE_POSITION[move]].canMovePiece();
    });

    this.setState({
      squares: newSquares
    });
  }

  // unhighlights the 'movable' pieces on the board
  dehighlightMoves() {
    let newStateSquares = this.state.squares;
    newStateSquares.forEach(square => {
      if (square.movable) {
        square.cannotMovePiece();
      }
    });

    this.setState({
      squares: newStateSquares
    });
  }

  checkPossibleMoves(index) {
    return $.ajax({
      url: "http://127.0.0.1:8000/game/get_moves/",
      method: "GET",
      data: { index: TRANSLATE_POSITION[index] }
    }).then(response => {
      this.highlightMoves(response.moves);
    });
  }

  // Function used to handle the piece moving, rn the
  // capture boolean doesn't do anything but I will use
  // it to keep track of pieces that have been captured
  handleMove(capture, index) {
    let preMovePosition = this.state.squares;
    let pieceToMove = this.state.squares[this.state.selected];
    let postMovePosition = preMovePosition;
    let capturedB = this.state.capturedBlackPieces;
    let capturedW = this.state.capturedWhitePieces;
    // If the piece was captured and it is White's turn then the
    // captured piece is black
    if (capture && this.state.turn === WHITE) {
      capturedB.push(preMovePosition[index]);
    }
    // If the piece was captured and it is Black's turn then the
    // captured piece is white
    else if (capture && this.state.turn === BLACK) {
      capturedW.push(preMovePosition[index]);
    }

    if (!this.checkIfMoveValid(index)) {
      this.setError("Cannot move piece there");
    } else {
      pieceToMove.deselectPiece();
      this.dehighlightMoves();
      postMovePosition[index] = pieceToMove;
      postMovePosition[this.state.selected] = null;
      this.setState({
        squares: postMovePosition,
        selected: NOT_SELECTED,
        capturedBlackPieces: capturedB,
        capturedWhitePieces: capturedW,
        turn: this.state.turn === WHITE ? BLACK : WHITE,
        count: this.state.count + 1,
        error: ""
      });
    }
  }

  // Function that is passed down to the child components used
  // to handle moving the pieces
  handleClick(index) {
    let newStateSquares = this.state.squares;
    // if the player currently has no piece selected
    if (this.state.selected === NOT_SELECTED) {
      // if the spot that was clicked was the current player's color
      if (this.checkIfPieceBelongsToCurrentPlayer(index)) {
        this.checkPossibleMoves(index);
        newStateSquares[index].selectPiece();
        this.setState({
          squares: newStateSquares,
          selected: index,
          error: ""
        });
      } else if (this.checkIfPieceBelongsToOpponentPlayer(index)) {
        // if the spot that was clicked was the opponent's color
        this.setError("Cannot move opponent's piece");
      }
    } else {
      // if the player currently has a piece selected
      // check the spot that was clicked

      // if the spot that was clicked was the current player's color
      if (this.checkIfPieceBelongsToCurrentPlayer(index)) {
        // if the spot selected is the current selected piece, then we just need to
        // deselect the piece
        if (this.checkIfSelectedPieceIsAlreadySelected(index)) {
          this.dehighlightMoves();
          newStateSquares[index].deselectPiece();
          this.setState({
            squares: newStateSquares,
            selected: NOT_SELECTED,
            error: ""
          });
        } else {
          // if the spot selected is not the current selected piece throw an error,
          // since you cannot capture your own piece
          this.setError("Cannot cannot capture your own piece");
        }
      } else if (this.checkIfPieceBelongsToOpponentPlayer(index)) {
        // if the spot that was clcked was the opposite player's color
        let captured = true;
        this.handleMove(captured, index);
      } else if (this.checkIfSelectedIsEmpty(index)) {
        // if the spot that was clicked was an empty spot
        let captured = false;
        this.handleMove(captured, index);
      }
    }
  }

  render() {
    return (
      <div className="game-container">
        <div className="spacer" />
        <LeftSidebar
          white={this.state.capturedWhitePieces}
          black={this.state.capturedBlackPieces}
        />
        <Board squares={this.state.squares} handleClick={this.handleClick} />
        <RightSidebar
          turn={this.state.turn}
          count={this.state.count}
          error={this.state.error}
        />
        <div className="spacer" />
      </div>
    );
  }
}
