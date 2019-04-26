export default class Piece {
  constructor(player, svg) {
    this.player = player;
    this.svg = svg;
    this.selected = false;
    this.movable = false;
  }
ß
  canMovePiece() {
    this.movable = true;
  }

  cannotMovePiece() {
    this.movable = false;
  }

  selectPiece() {
    this.selected = true;
  }

  deselectPiece() {
    this.selected = false;
  }
}
