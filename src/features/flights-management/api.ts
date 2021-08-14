import httpClientInstance from "@app/http-client";
import { Flight } from "./types";

export const fetchAllFlights = async (): Promise<Flight[] | never> => {
  try {
    return (await httpClientInstance.get<Flight[]>("/flights")).data;
  } catch (error) {
    throw new Error(error);
  }
};
