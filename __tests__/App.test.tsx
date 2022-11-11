import {act, cleanup, fireEvent, waitFor} from '@testing-library/react-native';
import * as React from 'react';
import axios from 'axios';
import AppNavigator from '../src/navigations/Navigator';
import CharacterList from '../src/screens/tab-feed/CharacterList';
import {renderWithProviders} from '../test-utils';
import {mockedInfo, mockedResult} from '../__mocks__/mock';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Character App', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.clearAllMocks();
  });

  afterEach(cleanup);

  describe('initial rendering', () => {
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

  describe('after api call success', () => {
    it('should show system alert if error thrown from api', async () => {
      const characterState = {
        characters: [],
        fetchError: 'Failed to fetch',
        isLoading: false,
        totalPage: 0,
      };
      const {getByText} = renderWithProviders(<CharacterList />, {
        preloadedState: {
          character: characterState,
        },
      });
      await waitFor(() => {
        expect(getByText('Failed to fetch')).toBeDefined();
      });
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
      const {getByTestId, getAllByTestId} = renderWithProviders(
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
      const characterState = {
        characters: mockedResult,
        fetchError: '',
        isLoading: false,
        totalPage: 20,
      };
      const {getAllByTestId} = renderWithProviders(<CharacterList />, {
        preloadedState: {
          character: characterState,
        },
      });
      expect(getAllByTestId('character-item')).toBeDefined();
    });
  });

  describe('click reset button', () => {
    it('should show empty view after clicked reset button', async () => {
      const {getByTestId, getByText} = renderWithProviders(<CharacterList />);
      fireEvent.press(getByTestId('reset-btn'));
      expect(getByText('Pull to load data')).toBeDefined();
    });

    it('should show system alert after clicked reset button', async () => {
      const {getByTestId, getByText} = renderWithProviders(<CharacterList />);
      fireEvent.press(getByTestId('reset-btn'));
      expect(getByText('All data has been resetted.')).toBeDefined();
    });
  });
});
