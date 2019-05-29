import React from "react";
import { Square } from "./Square";
import { WHITE } from "../constants";

import blackQueen from "../../../cburnett/bq.svg"
import whiteQueen from "../../../cburnett/wq.svg"
import blackRook from "../../../cburnett/br.svg"
import whiteRook from "../../../cburnett/wr.svg"
import blackKnight from "../../../cburnett/bn.svg"
import whiteKnight from "../../../cburnett/wn.svg"
import blackBishop from "../../../cburnett/bb.svg"
import whiteBishop from "../../../cburnett/wb.svg"
import "../piecepromotion.css";

export class PiecePromotion extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let { color, show, handleClick } = this.props;
    let whitePieces = [whiteQueen, whiteRook, whiteKnight, whiteBishop];
    let blackPieces = [blackQueen, blackRook, blackKnight, blackBishop];
    let usePieces = (color === WHITE ? whitePieces :  blackPieces);

    if (!show) {
      return null;
    }

    return (
      <div className="overlay">
        <br/>
        <div>Select the piece you want to promote to!</div>
        <div className="overlay-container">
          {
            usePieces.map((piece, i) => {
              return (
                <Square
                  key={i}
                  piece={piece}
                  selected={null}
                  movable={null}
                  squareColor={null}
                  onClick={() => handleClick(i)}
                />
              );
            })
          }
        </div>
      </div>
    );
  }
}
