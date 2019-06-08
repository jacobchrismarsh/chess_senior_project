import React from "react";
import { shallow } from 'enzyme';
import { GameOver } from '../../../../modules/Game/subcomponents/GameOver';

describe("modules/Game/subcomponents/GameOver.jsx", () => {
  it("should render the GameOver components", () => {
    let gameOver = shallow(<GameOver show={true} winner="Yeet" />);
    expect(gameOver).toMatchSnapshot();
  });

  it("should not render the GameOver components", () => {
    let gameOver = shallow(<GameOver show={false} winner="Yeet" />);
    expect(gameOver).toMatchSnapshot();
  });
});