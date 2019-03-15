import Piece from "./Piece";
import bq from "../../../../cburnett/bq.svg";
import wq from "../../../../cburnett/wq.svg";

export class Queen extends Piece {
  constructor(player) {
    super(player, player === "White" ? wq : bq);
  }
}
