import Piece from "./Piece";
import bn from "../../../../cburnett/bn.svg";
import wn from "../../../../cburnett/wn.svg";

export class Knight extends Piece {
  constructor(player) {
    super(player, player === "White" ? wn : bn);
  }
}
