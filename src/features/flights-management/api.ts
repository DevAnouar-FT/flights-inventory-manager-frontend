import httpClientInstance from "@app/httpClient";
import { Flight } from "./types";

export const endpoints = {
  flights: "/flights",
};

export const fetchAllFlights = async (): Promise<Flight[] | never> => {
  try {
    return (
      (
        await httpClientInstance.get<(Flight & { contingents: string[] })[]>(
          endpoints.flights
        )
      ).data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map<Flight>(({ contingents, ...flightData }) => flightData)
    );
  } catch (error) {
    throw new Error(error);
  }
};
