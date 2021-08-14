import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import * as API from "./api";
import { Flight } from "./types";
import { FetchStatus } from "@app/types";

interface FlightsState {
  flights: Flight[];
  fetchStatus: FetchStatus;
}

const initialState: FlightsState = {
  flights: [],
  fetchStatus: FetchStatus.IDLE,
};

const sliceName = "flights-manager";

export const fetchAllFlights = createAsyncThunk<Flight[]>(
  `${sliceName}/fetchAllFlights`,
  API.fetchAllFlights
);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllFlights.pending, (state) => {
      state.fetchStatus = FetchStatus.LOADING;
    });
    builder.addCase(fetchAllFlights.fulfilled, (state, { payload }) => {
      state.flights = payload;
      state.fetchStatus = FetchStatus.IDLE;
    });
    builder.addCase(fetchAllFlights.rejected, (state) => {
      state.fetchStatus = FetchStatus.FAILED;
    });
  },
});

export default slice.reducer;
