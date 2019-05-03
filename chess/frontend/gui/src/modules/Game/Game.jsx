import React from "react";
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
    this.handleClick = this.handleClick.bind(this);
    this.handleMove = this.handleMove.bind(this);
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
    pieceToMove.deselectPiece();
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

  opponentColor() {
    return this.state.turn === WHITE ? BLACK : WHITE
  }

  checkPossibleMoves(index) {
    return $.ajax({
      url: "http://127.0.0.1:8000/game/get_moves/",
      method: "GET",
      data: { index: TRANSLATE_POSITION[index] }
    }).then(response => {
      this.highlightMoves(response.moves)
    });
  }

  highlightMoves(moves) {
    let newSquares = this.state.squares;

    moves.forEach(move => {
      newSquares[TRANSLATE_POSITION[move]].canMovePiece()
    });

    this.setState({
      squares: newSquares
    });
  }

  // Function that is passed down to the child components used
  // to handle moving the pieces
  handleClick(index) {
    this.checkPossibleMoves(index);
    // If the user selects the oponent's peice first
    if (
      this.state.selected === NOT_SELECTED && this.state.turn !== this.state.squares[index].player) {
      this.setState({
        error: "Cannot move opponent's piece"
      });
    } else if (this.state.selected !== NOT_SELECTED) {
      let captured = this.state.squares[index].player === this.opponentColor()
      this.handleMove(captured, index);
    }

    // If the user selects a spot on the board that has a piece
    else if (this.state.squares[index] != null) {
      let newState = this.state.squares;
      // Check whether or not that peice is already selected
      if (this.state.squares[index].selected) {
        newState[index].deselectPiece();
        this.setState({
          squares: newState,
          selected: NOT_SELECTED,
          error: ""
        });
      } else {
        newState[index].selectPiece();
        this.setState({
          squares: newState,
          selected: index,
          error: ""
        });
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
