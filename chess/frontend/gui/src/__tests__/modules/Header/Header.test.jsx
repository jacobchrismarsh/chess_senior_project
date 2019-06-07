import React from 'react';
import { shallow } from 'enzyme';
import Header from "../../../modules/Header/Header";

describe("modules/Header/Header.jsx", () => {

  let header = null;

  beforeEach(() => {
    header = shallow(<Header />);
  });

  it("should render the Header component", () => {
    expect(header).toMatchSnapshot();
  });

  it("should return an even number when fed and even number", () => {
    let even = header.instance().getRandomNumberOfSamePolarity(2, 10);
    expect(even % 2 === 0).toBeTruthy();
  });

  it("should return an odd number when fed an odd number", () => {
    let odd = header.instance().getRandomNumberOfSamePolarity(1, 10);
    expect(odd % 2 !== 0).toBeTruthy();
  });

  it("should return true on an even number", () => {
    expect(header.instance().isEven(2)).toBeTruthy();
  });

  it("should return false on an odd number", () => {
    expect(header.instance().isEven(1)).not.toBeTruthy();
  })
});