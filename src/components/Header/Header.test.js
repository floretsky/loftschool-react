import React from "react";
import { render } from "@testing-library/react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Header } from "./Header";

configure({ adapter: new Adapter() });

describe("Header", () => {
  it("shows properly", () => {
    const { queryByTestId } = render(<Header />);

    expect(queryByTestId("header")).toBeTruthy();
  });

  it("changes page", () => {
    const props = {
      switchPage: jest.fn(),
    };

    const component = shallow(<Header {...props} />);

    expect(component.find(".map-button").prop("switchPage")).toBe(
      component.instance().switchPage
    );

    expect(component.find(".profile-button").prop("switchPage")).toBe(
      component.instance().switchPage
    );
  });

  it("clicks on navigation links", () => {
    const mockCallback = jest.fn();
    const wrapper = mount(<Header switchPage={mockCallback} />),
      links = wrapper.find(".button:not(.logout-button)");
    links.forEach((link) => {
      link.simulate("click");
    });
    expect(mockCallback.mock.calls.length).toBe(links.length);
  });
});
