import React from "react";
import { shallow } from 'enzyme';
import { Square } from "../../../../modules/Game/subcomponents/Square";
import { WHITE } from "../../../../modules/Game/constants";

describe("modules/Game/subcomponents/Square", () => {  
  it("should render the Square component", () => {
    let square = shallow(<Square selected={false} movable={false} squareColor={WHITE} />);
    expect(square).toMatchSnapshot();
  });
});