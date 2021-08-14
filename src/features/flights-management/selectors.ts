import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@app/store";
import type { DisplayableFlights } from "./components/FlightsList";

export const selectAllFlights = createSelector<
  RootState,
  RootState["flightsManager"]["flights"],
  DisplayableFlights
>(
  (rootState) => rootState.flightsManager.flights,
  (flights): DisplayableFlights =>
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
