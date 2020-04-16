import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { AuthProvider, AuthContext } from "./AuthContext";

const mock = () => (
  <AuthProvider>
    <AuthContext.Consumer>
      {({ authorized, login, logout }) => (
        <>
          <button type="button" data-testid="login" onClick={login}>
            Sign In
          </button>
          <button type="button" data-testid="logout" onClick={logout}>
            Sign out
          </button>
          <div data-testid="authorized">{String(authorized)}</div>
        </>
      )}
    </AuthContext.Consumer>
  </AuthProvider>
);

describe("AuthContext", () => {
  it("initializes with logged out state as default", () => {
    const { getByTestId } = render(mock());
    expect(getByTestId("authorized").textContent).toEqual("false");
  });

  it("changes authorized status after performing login func", () => {
    const { getByTestId } = render(mock());

    fireEvent.click(getByTestId("login"));
    expect(getByTestId("authorized").textContent).toEqual("true");
  });

  it("changes authorized status after performing logout func", () => {
    const { getByTestId } = render(mock());

    fireEvent.click(getByTestId("logout"));
    expect(getByTestId("authorized").textContent).toEqual("false");
  });
});
