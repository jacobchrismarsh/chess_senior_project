import Piece from "./Piece";
import bk from "../../../../cburnett/bk.svg";
import wk from "../../../../cburnett/wk.svg";

export class King extends Piece {
  constructor(player) {
    super(player, player === "White" ? wk : bk);
  }
}
