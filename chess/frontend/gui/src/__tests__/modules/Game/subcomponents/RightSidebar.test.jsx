import React from "react";
import { shallow } from 'enzyme';
import { RightSidebar } from '../../../../modules/Game/subcomponents/RightSidebar';
import { WHITE } from '../../../../modules/Game/constants';

describe("modules/Dashboard/subcomponents/RightSidebar.jsx", () => {
  it("should render the RightSidebar component", () => {
    let rightSidebar = shallow(<RightSidebar count={0} turn={WHITE} />);
    expect(rightSidebar).toMatchSnapshot();
  });
});