import React from 'react';
import { render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import configureMockStore from 'redux-mock-store';

import Header from './Header';

const mockStore = configureMockStore();
const store = mockStore({
  auth: { isAuthorized: true },
});

describe('Header', () => {
  it('renders properly', () => {
    const { queryByTestId } = render(
      <Router>
        <Header store={store} />
      </Router>
    );
    expect(queryByTestId('header')).toBeTruthy();
  });
});
