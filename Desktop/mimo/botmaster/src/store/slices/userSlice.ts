import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { UserState } from '../../types';

const initialState: UserState = {
  name: '',
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.name = '';
      state.isLoggedIn = false;
    },
    updateName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
  },
});

export const { login, logout, updateName } = userSlice.actions;
export default userSlice.reducer;

