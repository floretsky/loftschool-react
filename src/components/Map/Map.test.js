import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import Map from './Map';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(() => ({
    addControl: () => {},
    createObjectUrl: () => {},
    on: () => {},
  })),
}));

const mockStore = configureMockStore();
const store = mockStore({
  auth: { isAuthorized: true },
  profile: { hasCard: false },
  route: { isOrdered: false, coords: [30.335098, 59.93428] },
});

describe('Map', () => {
  it('renders without crashing', () => {
    const { queryByTestId } = render(
      <Provider store={store}>
        <Map />
      </Provider>
    );
    expect(queryByTestId('map')).toBeTruthy();
  });
});
