import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import type { DisplayedFlights } from "./components/FlightsList";
import { FetchStatus } from "@app/types";

export const selectAllFlights = createSelector<
  RootState,
  RootState["flightsManager"]["flights"],
  DisplayedFlights
>(
  (rootState) => rootState.flightsManager.flights,
  (flights): DisplayedFlights =>
    flights.map(
      ({ id, iataCarrierCode, number, date, origin, destination }) => ({
        id,
        iataNumber: `${iataCarrierCode} ${number}`,
        date,
        origin,
        destination,
      })
    )
);

export const isFlightsListLoading = createSelector<
  RootState,
  RootState["flightsManager"]["fetchStatus"],
  boolean
>(
  (rootState) => rootState.flightsManager.fetchStatus,
  (fetchStatus): boolean => fetchStatus === FetchStatus.LOADING
);
