import httpClientInstance from "@app/http-client";
import { Flight } from "./types";

export const fetchAllFlights = async (): Promise<Flight[] | never> => {
  try {
    return (
      (
        await httpClientInstance.get<(Flight & { contingents: string[] })[]>(
          "/flights"
        )
      ).data
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .map<Flight>(({ contingents, ...flightData }) => flightData)
    );
  } catch (error) {
    throw new Error(error);
  }
};
