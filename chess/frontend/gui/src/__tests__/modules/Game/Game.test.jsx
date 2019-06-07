import React from 'react';
import { shallow } from 'enzyme';
import Game from "../../../modules/Game/Game";
import {
  Pawn,
  Knight,
  Rook,
  Bishop,
  Queen,
  King,
  Empty
} from "../../../modules/Game/subcomponents/Pieces";
import {
  NOT_SELECTED,
  BLACK_PAWN_INIT,
  WHITE_PAWN_INIT,
  BLACK_KNIGHT_INIT,
  WHITE_KNIGHT_INIT,
  BLACK_ROOK_INIT,
  WHITE_ROOK_INIT,
  BLACK_BISHOP_INIT,
  WHITE_BISHOP_INIT,
  BLACK_QUEEN_INIT,
  WHITE_QUEEN_INIT,
  BLACK_KING_INIT,
  WHITE_KING_INIT,
  WHITE,
  BLACK,
  TRANSLATE_POSITION,
  ONE_MINUTE
} from "../../../modules/Game/constants";

describe("modules/Game/Game.jsx", () => {
  let game = null;

  beforeEach(() => {
    game = shallow(<Game />);
  });

  it("should give an initial board", () => {
    let squares = game.instance().initBoard();
    expect(squares).toEqual(
      [
        {"movable": false, "player": "Black", "selected": false, "svg": "br.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bn.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bb.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bq.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bk.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bb.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bn.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "br.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": "Black", "selected": false, "svg": "bp.svg"},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": null, "selected": false, "svg": undefined},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wp.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wr.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wn.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wb.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wq.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wk.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wb.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wn.svg"},
        {"movable": false, "player": "White", "selected": false, "svg": "wr.svg"}]);
  });

  it("should render the Game component", () => {
    expect(game).toMatchSnapshot();
  });
});