import Piece from "./Piece";
import bp from "../../../../cburnett/bp.svg";
import wp from "../../../../cburnett/wp.svg";

export class Pawn extends Piece {
  constructor(player) {
    super(player, player === "White" ? wp : bp);
  }
}
