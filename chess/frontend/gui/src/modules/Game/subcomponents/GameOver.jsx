import React from "react";
import { WHITE, BLACK } from "../constants";
import "../piecepromotion.css"; // same stuff here so might as well

export class GameOver extends React.Component {
  render() {
    let { show, winner } = this.props;

    if (!show) {
      return null;
    }

    return (
      <div className="overlay">
        <div className="overlay-container game-over-text">
          Game Over! { winner } wins!
        </div>
      </div>
    );
  }
}
