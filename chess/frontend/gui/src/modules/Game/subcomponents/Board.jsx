import React from "react";
import { Square } from "./Square";
import "../board.css";

export class Board extends React.Component {
  renderSquare(i, squareColor) {
    return (
      <Square
        key={i}
        piece={this.props.squares[i] ? this.props.squares[i].svg : null}
        selected={this.props.squares[i] ? this.props.squares[i].selected : null}
        movable={this.props.squares[i] ? this.props.squares[i].movable : null}
        squareColor={squareColor}
        onClick={() => this.props.handleClick(i)}
      />
    );
  }

  isEven(num) {
    return num % 2 === 0;
  }

  getSquareColor(i, j) {
    return (this.isEven(i) && this.isEven(j)) ||
      (!this.isEven(i) && !this.isEven(j))
      ? "light"
      : "dark";
  }

  render() {
    const board = [];
    for (let i = 0; i < 8; i++) {
      const squareRows = [];
      for (let j = 0; j < 8; j++) {
        squareRows.push(
          this.renderSquare(i * 8 + j, this.getSquareColor(i, j))
        );
      }
      board.push(
        <div key={i} className="board-row">
          {squareRows}
        </div>
      );
    }
    return <div className="game-board">{board}</div>;
  }
}
