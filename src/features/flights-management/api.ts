import httpClientInstance from "@app/httpClient";
import { Flight, FlightDTO } from "./types";

export const endpoints = {
  flights: "/flights",
};

export const fetchAllFlights = async (): Promise<Flight[] | never> => {
  try {
    return (
      (await httpClientInstance.get<FlightDTO[]>(endpoints.flights)).data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map<Flight>(({ contingents, ...flightData }) => flightData)
    );
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchFlightById = async (
  flightId: string
): Promise<FlightDTO | never> => {
  try {
    return (
      await httpClientInstance.get<FlightDTO[]>(
        `${endpoints.flights}?id=${flightId}`
      )
    ).data[0];
  } catch (error) {
    throw new Error(error);
  }
};
