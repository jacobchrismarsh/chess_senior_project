export default class Piece {
  constructor(player, svg) {
    this.player = player;
    this.svg = svg;
    this.selected = false;
    this.moveable = false;
  }

  canMovePiece() {
    this.moveable = true;
  }

  cannotMovePiece() {
    this.moveable = false;
  }

  selectPiece() {
    this.selected = true;
  }

  deselectPiece() {
    this.selected = false;
  }
}
