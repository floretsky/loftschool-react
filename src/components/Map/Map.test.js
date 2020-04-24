import React from 'react';
import ReactDOM from 'react-dom';
import { Map } from './Map';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: jest.fn(() => ({ addControl: () => {} })),
  GeolocateControl: jest.fn(),
}));

describe('Map', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Map />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
