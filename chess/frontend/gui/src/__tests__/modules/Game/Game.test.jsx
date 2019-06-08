import React from 'react';
import { shallow } from 'enzyme';
import Game from "../../../modules/Game/Game";

describe("modules/Game/Game.jsx", () => {
  let game = null;

  beforeEach(() => {
    const realDateNow = Date.now.bind(global.Date);
    const dateNowStub = jest.fn(() => 1530518207007);
    global.Date.now = dateNowStub;
    
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