import {act, cleanup, waitFor} from '@testing-library/react-native';
import axios from 'axios';
import * as React from 'react';
import AppNavigator from '../src/navigations/Navigator';
import CharacterList from '../src/screens/tab-feed/CharacterList';
import {renderWithNavigation, renderWithProviders} from '../test-utils';
import {mockedInfo, mockedResult} from '../__mocks__/mock';

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Character App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  describe('Initial Rendering', () => {
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
  });

  describe('After api call success', () => {
    it('render error message if error thrown from api', async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            error: 'There is nothing here',
          },
        }),
      );
      const {getByTestId, getByText} = renderWithNavigation(<CharacterList />);
      await waitFor(() => {
        return getByTestId('pull-text');
      });
      expect(getByText('Pull to load data')).toBeDefined();
    });

    it('should show 20 character items of the first page of characters api when pull to refresh event is triggered', async () => {
      mockedAxios.get.mockImplementationOnce(() =>
        Promise.resolve({
          data: {
            results: mockedResult,
            info: mockedInfo,
          },
        }),
      );
      const {getByTestId, getAllByTestId} = renderWithNavigation(
        <CharacterList />,
      );
      const flatList = getByTestId('characters-flatlist');
      expect(flatList).toBeDefined();
      // Mock pull-to-refresh event
      const {refreshControl} = flatList.props;
      await act(async () => {
        refreshControl.props.onRefresh();
      });
      expect(getAllByTestId('character-item')).toHaveLength(20);
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
      const {getAllByTestId} = renderWithNavigation(<CharacterList />);
      expect(getAllByTestId('character-item')).toBeDefined();
    });
  });
});
