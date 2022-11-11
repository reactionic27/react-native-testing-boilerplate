import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {CHARACTERS_FETCH_URL} from '../../utils/constants';

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: string;
  image: string;
  name: string;
  status: string;
  episode: string[];
  species: string;
  location: Location;
  origin: Location;
  gender: string;
  created: string;
}

interface CharacterState {
  characters: Array<Character>;
  fetchError: string;
  isLoading: boolean;
  totalPage: number;
}

const initialState: CharacterState = {
  characters: [],
  fetchError: '',
  isLoading: false,
  totalPage: 0,
};

export const fetchCharacters: any = createAsyncThunk(
  'feed/fetch-characters',
  async (pageIndex: number, thunkApi) => {
    try {
      const response = await axios.get(
        `${CHARACTERS_FETCH_URL}?page=${pageIndex + 1}`,
      );
      return {
        results: response.data.results,
        totalPage: response.data.info.pages,
      };
    } catch (e) {
      return thunkApi.rejectWithValue('Failed to fetch');
    }
  },
);

export const CharacterSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    intializeCharacters: state => {
      state.characters = [];
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchCharacters.fulfilled, (state, action) => {
      const {results, totalPage} = action.payload;
      let updatedCharacters = [...state.characters, ...results];
      // To make sure list contents are unique value
      let uniqueCharacters = new Set(
        updatedCharacters.map(data => JSON.stringify(data)),
      );
      updatedCharacters = Array.from(uniqueCharacters).map(unique =>
        JSON.parse(unique),
      );
      // If page index is 0, we should set the state characters value with first page result
      // If not, we can add the additional contents in next page to state characters value
      state.characters = action.meta.arg === 0 ? results : updatedCharacters;
      state.isLoading = false;
      state.fetchError = '';
      state.totalPage = totalPage;
    });
    builder.addCase(fetchCharacters.pending, state => {
      state.isLoading = true;
    });
    builder.addCase(fetchCharacters.rejected, (state, action) => {
      state.fetchError = action.payload as string;
      state.characters = [];
      state.isLoading = false;
    });
  },
});

export const {intializeCharacters} = CharacterSlice.actions;
export default CharacterSlice.reducer;
