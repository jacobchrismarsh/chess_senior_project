import React from "react";
import { shallow } from 'enzyme';
import Home from "../../../modules/Home/Home";

describe("modules/Home/Home.jsx", () => {
  it('should render the Home component', () => {
    let home = shallow(<Home />);
    expect(home).toMatchSnapshot();
  });
});
