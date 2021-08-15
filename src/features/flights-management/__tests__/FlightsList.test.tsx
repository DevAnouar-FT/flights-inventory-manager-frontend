import * as React from "react";
import { setupServer } from "msw/node";
import { rest } from "msw";
import { screen, waitFor } from "@testing-library/react";
import dayjs from "dayjs";

import { endpoints } from "../api";
import { Flight } from "../types";
import { render } from "@src/testUtils";
import FlightsList, { DisplayedFlights } from "../components/FlightsList";

describe("flights-management/components/FlightsList.tsx", (): void => {
  const flights: Flight[] = [
    {
      id: "5973cda0-f7ef-4761-90cb-fcd9097f8ea2",
      iataCarrierCode: "xa",
      number: 5952,
      date: "2022-06-05T16:10:41.209Z",
      origin: "swj",
      destination: "tcd",
    },
    {
      id: "649b022f-67f4-4590-862d-40769ff61704",
      iataCarrierCode: "we",
      number: 2972,
      date: "2022-06-12T19:33:53.300Z",
      origin: "hpa",
      destination: "zjv",
    },
    {
      id: "0b25ac6f-b9b2-4f23-bfe2-454ab3691c80",
      iataCarrierCode: "am",
      number: 3392,
      date: "2021-10-28T05:00:00.318Z",
      origin: "ars",
      destination: "nfn",
    },
  ];
  const server = setupServer(
    rest.get<undefined, Flight[]>(
      `http://localhost:4000${endpoints.flights}`,
      (_, res, ctx) => res(ctx.json(flights))
    )
  );

  beforeAll((): void => {
    server.listen();
  });

  afterEach((): void => {
    server.resetHandlers();
  });

  afterAll((): void => {
    server.close();
  });

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

    await waitFor<void>(() => {
      displayedFlightsData.forEach((data) => {
        expect(screen.getByText(data)).toBeInTheDocument();
      });
    });
  });
});
