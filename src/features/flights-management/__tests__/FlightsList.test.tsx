import * as React from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import dayjs from "dayjs";

import { endpoints } from "../api";
import type { FlightDTO } from "../types";
import { render } from "@src/testUtils";
import FlightsList, { DisplayedFlights } from "../components/FlightsList";
import { Contingent } from "@features/contingents-management/types";
import { contingentsEndpoints } from "@features/contingents-management";
import { flights } from "@src/dummyTestData";

describe("flights-management/components/FlightsList.tsx", (): void => {
  it("Should load and display a list of flights", async (): Promise<void> => {
    const displayedFlightsData: string[] = flights
      .map<Omit<DisplayedFlights[number], "id">>(
        ({ iataCarrierCode, number, date, origin, destination }) => ({
          iataNumber: `${iataCarrierCode} ${number}`.toUpperCase(),
          date: dayjs(date).format("M/D/YYYY"),
          origin: origin.toUpperCase(),
          destination: destination.toUpperCase(),
        })
      )
      .reduce<string[]>(
        (displayedData, currentFlightData) => [
          ...displayedData,
          ...Object.values<string>(
            currentFlightData as unknown as Record<string, string>
          ),
        ],
        []
      );
    render(<FlightsList />);
    await waitFor(() =>
      screen.getByTestId(
        `flightsDataGrid_row_${flights[flights.length - 1].id}`
      )
    );

    displayedFlightsData.forEach((data) => {
      expect(screen.getByText(data)).toBeInTheDocument();
    });
  });
});
