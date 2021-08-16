import * as React from "react";
import { screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";

import { render } from "@src/testUtils";
import FlightsList, { DisplayedFlights } from "../components/FlightsList";
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
