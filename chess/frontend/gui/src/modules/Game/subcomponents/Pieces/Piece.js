export default class Piece {
  constructor(player, svg) {
    this.player = player;
    this.svg = svg;
    this.selected = false;
  }

  selectPiece() {
    this.selected = true;
  }

  deselectPiece() {
    this.selected = false;
  }
}
