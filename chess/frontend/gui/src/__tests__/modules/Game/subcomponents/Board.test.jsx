import React from "react";
import { shallow } from 'enzyme';
import { WHITE } from '../../../../modules/Game/constants';
import { Board } from '../../../../modules/Game/subcomponents/Board';

describe("modules/Game/subcomponents/Board.jsx", () => {

  let board = null;

  beforeEach(() => {
    board = shallow(<Board
      yourColor={WHITE}
      squares={[]}
      handleClick={jest.fn()}
      turn={WHITE}
      move={0}
    />);
  });

  it("should return true on an even input", () => {
    expect(board.instance().isEven(2)).toBeTruthy();
  });

  it("should return false on an odd input", () => {
    expect(board.instance().isEven(1)).not.toBeTruthy();
  })

  it("should render the Board component", () => {
    expect(board).toMatchSnapshot();
  });
});