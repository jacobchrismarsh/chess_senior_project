import Piece from "./Piece";
import br from "../../../../cburnett/br.svg";
import wr from "../../../../cburnett/wr.svg";

export class Rook extends Piece {
  constructor(player) {
    super(player, player === "White" ? wr : br);
  }
}
