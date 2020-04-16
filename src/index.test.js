import ReactDOM from "react-dom";
import { renderToDOM } from "./index";

// fixing mapbox-gl test error
jest.mock("mapbox-gl/dist/mapbox-gl", () => ({
  Map: () => ({}),
}));

describe("test ReactDOM.render", () => {
  const originalRender = ReactDOM.render;
  const originalGetElement = global.document.getElementById;
  beforeEach(() => {
    global.document.getElementById = () => true;
    ReactDOM.render = jest.fn();
  });
  afterAll(() => {
    global.document.getElementById = originalGetElement;
    ReactDOM.render = originalRender;
  });
  it("should call ReactDOM.render", () => {
    renderToDOM();
    expect(ReactDOM.render).toHaveBeenCalled();
  });
});
