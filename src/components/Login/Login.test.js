import React from "react";
import ReactDOM from "react-dom";
import { Login } from "./Login";

describe("Login", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Login handlerSubmit={() => {}} />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
