import React from 'react';
import { render } from '@testing-library/react';
import configureMockStore from 'redux-mock-store';

import Login from './Login';

const mockStore = configureMockStore();
const store = mockStore({
  auth: { isAuthorized: false },
});

describe('Login', () => {
  it('renders without crashing', () => {
    const { queryByText } = render(<Login store={store} />);
    expect(queryByText('New user?')).toBeTruthy();
  });
});
