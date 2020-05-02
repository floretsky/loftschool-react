import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import Profile from './Profile';

const mockStore = configureMockStore();
const store = mockStore({
  auth: { token: undefined },
  profile: { hasCard: false },
});

describe('Profile', () => {
  it('renders without crashing', () => {
    const { queryByText } = render(<Profile store={store} />);
    expect(queryByText('Please enter your card number')).toBeTruthy();
  });
});
