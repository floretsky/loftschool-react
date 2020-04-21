import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  Map: () => ({}),
}));

configure({ adapter: new Adapter() });

describe('App', () => {
  it('renders', () => {
    const { getByTestId } = render(<App />);
    const linkElement = getByTestId('main-area');
    expect(linkElement).toBeInTheDocument();
  });
});
