import React from "react";
import { shallow } from 'enzyme';
import { LeftSidebar } from '../../../../modules/Game/subcomponents/LeftSidebar';
import { WHITE } from '../../../../modules/Game/constants';

describe("modules/Dashboard/subcomponents/LeftSidebar.jsx", () => {
  it("should render the LefttSidebar component", () => {
    let leftSidebar = shallow(<LeftSidebar white={[]} black={[]} />);
    expect(leftSidebar).toMatchSnapshot();
  });
});