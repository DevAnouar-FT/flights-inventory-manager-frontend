import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";

import { flightsManagerReducer } from "@features/flights-management";
import { contingentsManagerReducer } from "@features/contingents-management";

export const store = configureStore({
  reducer: {
    flightsManager: flightsManagerReducer,
    contingentsManager: contingentsManagerReducer,
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
