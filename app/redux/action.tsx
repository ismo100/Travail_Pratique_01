import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface userState {
  email: string;
}

const initialState: userState = {
  email: '',
};

export const mySlice = createSlice({
  name: 'userState',
  initialState,
  reducers: {
    setEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
  },
});

export const { setEmail } = mySlice.actions;
export const myReducer = mySlice.reducer;
