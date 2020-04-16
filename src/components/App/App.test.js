import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { Header } from "../Header/Header";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders", () => {
    const { getByTestId } = render(<App />);
    const linkElement = getByTestId("main");
    expect(linkElement).toBeInTheDocument();
  });

  it("should call switchPage function after clicks on buttons in Header", () => {
    const mockCallBack = jest.fn();
    const headerComponent = shallow(<Header switchPage={mockCallBack} />);
    headerComponent.find(".profile-button").simulate("click", "profile");
    headerComponent.find(".profile-button").simulate("click", "map");

    App.prototype.switchPageMethod = mockCallBack;
    jest.spyOn(App.prototype, "switchPageMethod");
    expect(App.prototype.switchPageMethod).toHaveBeenCalledTimes(2);
  });
});
