import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import Map from './Map';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(() => ({
    addControl: () => {},
    createObjectUrl: () => {},
    on: () => {},
  })),
}));

const browserHistory = createBrowserHistory();
const mockStore = configureMockStore();
const store = mockStore({
  auth: { isAuthorized: true },
  profile: { hasCard: false },
  route: { isOrdered: false, coords: [30.335098, 59.93428] },
});

describe('Map', () => {
  it('renders without crashing', () => {
    const { queryByTestId } = render(
      <Router history={browserHistory}>
        <Provider store={store}>
          <Map />
        </Provider>
      </Router>
    );
    expect(queryByTestId('map')).toBeTruthy();
  });
});
