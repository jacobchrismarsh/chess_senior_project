import Piece from "./Piece";
import bb from "../../../../cburnett/bb.svg";
import wb from "../../../../cburnett/wb.svg";

export class Bishop extends Piece {
  constructor(player) {
    super(player, player === "White" ? wb : bb);
  }
}
