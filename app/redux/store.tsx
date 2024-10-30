import { configureStore } from '@reduxjs/toolkit';
import { myReducer } from './action';

export const store = configureStore({
  reducer: {
    userState: myReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
