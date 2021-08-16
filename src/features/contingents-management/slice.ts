import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import type { Contingent } from "./types";
import { FetchStatus } from "@app/types";
import * as API from "./api";

interface ContingentsState {
  contingents: Contingent[];
  fetchStatus: FetchStatus;
}

const initialState: ContingentsState = {
  contingents: [],
  fetchStatus: FetchStatus.IDLE,
};

const sliceName = "contingents-manager";

export const fetchContingentsByFlightId = createAsyncThunk<
  Contingent[],
  string
>(`${sliceName}/fetchContingentsByFlightId`, API.fetchContingentsByFlightId);

const slice = createSlice({
  name: sliceName,
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchContingentsByFlightId.pending, (state) => {
      state.fetchStatus = FetchStatus.LOADING;
    });
    builder.addCase(
      fetchContingentsByFlightId.fulfilled,
      (state, { payload }) => {
        state.contingents = payload;
        state.fetchStatus = FetchStatus.IDLE;
      }
    );
    builder.addCase(fetchContingentsByFlightId.rejected, (state) => {
      state.contingents = [];
      state.fetchStatus = FetchStatus.FAILED;
    });
  },
});

export default slice.reducer;
