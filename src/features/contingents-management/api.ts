import httpClientInstance from "@app/httpClient";
import { fetchFlightById } from "@features/flights-management";
import { Contingent } from "./types";

export const endpoints = {
  contingents: "/contingents",
};

export const fetchContingentsByIds = async (
  contingentsIds: Contingent["id"][]
): Promise<Contingent[] | never> => {
  try {
    const idsParamsReducer = (
      idsParams: string,
      currentId: string,
      index: number
    ) => `${idsParams}${index === 0 ? "" : "&"}id=${currentId}`;

    return (
      await httpClientInstance.get<Contingent[]>(
        `${endpoints.contingents}?${contingentsIds.reduce<string>(
          idsParamsReducer,
          ""
        )}`
      )
    ).data;
  } catch (error) {
    throw new Error(error);
  }
};

export const fetchContingentsByFlightId = async (
  flightId: string
): Promise<Contingent[] | never> => {
  try {
    return fetchContingentsByIds((await fetchFlightById(flightId)).contingents);
  } catch (error) {
    throw new Error(error);
  }
};
