import {createSlice} from '@reduxjs/toolkit';

interface AppState {
  visitedWelcome: boolean;
}

const initialState: AppState = {
  visitedWelcome: false,
};

export const AppSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    visitWelcome: state => {
      state.visitedWelcome = true;
    },
  },
});

export const {visitWelcome} = AppSlice.actions;
export default AppSlice.reducer;
