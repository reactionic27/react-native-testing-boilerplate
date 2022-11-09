import * as React from 'react';
import AppNavigator from '../src/navigations/Navigator';
import {renderWithProviders} from '../test-utils';

test('renders App correctly', async () => {
  const container = renderWithProviders(<AppNavigator />);
  expect(container).toMatchSnapshot();
});

test('should show reset button and pull to refresh data text in the first time', async () => {
  const {getByTestId} = renderWithProviders(<AppNavigator />);
  expect(getByTestId('reset-btn')).toBeDefined();
  expect(getByTestId('pull-text')).toBeDefined();
});
