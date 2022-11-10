import {act, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import * as React from 'react';
import AppNavigator from '../src/navigations/Navigator';
import CharacterList from '../src/screens/tab-feed/CharacterList';
import {
  mockedInfo,
  mockedResult,
  renderWithNavigation,
  renderWithProviders,
} from '../test-utils';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Character App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  it('renders App correctly', async () => {
    const container = renderWithProviders(<AppNavigator />);
    expect(container).not.toBeNull();
  });

  it('should show reset button and pull to refresh data text in the first time', async () => {
    const {getByTestId, getByText} = renderWithProviders(<AppNavigator />);
    expect(getByTestId('reset-btn')).toBeDefined();
    expect(getByText('Reset')).toBeDefined();
    expect(getByTestId('pull-text')).toBeDefined();
    expect(getByText('Pull to load data')).toBeDefined();
  });

  it('show fetch the first page of characters api when pull to refresh event is triggered', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          results: mockedResult,
          info: mockedInfo,
        },
      }),
    );
    const {getByTestId} = renderWithNavigation(<CharacterList />);
    const flatList = getByTestId('characters-flatlist');
    expect(flatList).toBeDefined();
    // Mock pull-to-refresh event
    const {refreshControl} = flatList.props;
    await act(async () => {
      refreshControl.props.onRefresh();
    });
    expect(getByTestId('character-item')).toBeDefined();
  });

  it('render error message if error thrown from api', async () => {
    jest.clearAllMocks();
    const {getByTestId, getByText} = renderWithNavigation(<CharacterList />);
    await waitFor(() => {
      return getByTestId('pull-text');
    });
    expect(getByText('Pull to load data')).toBeDefined();
  });

  it('should show flat list item if backend api send stable data', async () => {
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: {
          results: mockedResult,
          info: mockedInfo,
        },
      }),
    );
    const {getByTestId} = renderWithNavigation(<CharacterList />);
    expect(getByTestId('character-item')).toBeDefined();
  });
});
