import * as React from "react";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { render } from "@src/testUtils";
import FlightsListing from "../FlightsListing";
import { flights } from "@src/dummyTestData";

describe("pages/FlightsListing.tsx", (): void => {
  it("Should load and display a list of contingents after clicking on their corresponding flight from the flights list", async (): Promise<void> => {
    const flightToSelect = flights[0];
    const contingentsToDisplay = flightToSelect.contingents;
    render(<FlightsListing />);
    await waitFor<HTMLElement>(() =>
      screen.getByTestId(
        `flightsDataGrid_row_${flights[flights.length - 1].id}`
      )
    );

    userEvent.click(
      screen.getByTestId(`flightsDataGrid_row_${flightToSelect.id}`)
    );

    await waitFor(() =>
      screen.getByTestId(
        `selectedflightContingentsDataGrid_row_${
          contingentsToDisplay[contingentsToDisplay.length - 1]
        }`
      )
    );

    for (const contingentData in contingentsToDisplay.values()) {
      expect(screen.getByText(contingentData)).toBeInTheDocument();
    }
  });
});
