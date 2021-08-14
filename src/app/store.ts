import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { flightsManagerReducer } from "@features/flights-management";

export const store = configureStore({
  reducer: {
    flightsManager: flightsManagerReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
