// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom

import "@testing-library/jest-dom/extend-expect";
import { rest } from "msw";
import { setupServer } from "msw/node";

import { contingentsEndpoints } from "@features/contingents-management";
import { flightsManagementEndpoints } from "@features/flights-management";
import type { Contingent } from "@features/contingents-management/types";
import type { FlightDTO } from "@features/flights-management/types";
import { contingents, flights } from "./dummyTestData";

const server = setupServer(
  rest.get<Record<string, unknown>, FlightDTO[], Record<string, never>>(
    `http://localhost:4000${flightsManagementEndpoints.flights}`,
    ({ url: { searchParams } }, res, ctx) => {
      const flightIdSearchParameter: string | null = searchParams.get("id");

      return res(
        ctx.json(
          flightIdSearchParameter
            ? flights.filter(
                ({ id: flightId }) => flightId === flightIdSearchParameter
              )
            : flights
        )
      );
    }
  ),
  rest.get<Record<string, unknown>, Contingent[], Record<string, never>>(
    `http://localhost:4000${contingentsEndpoints.contingents}`,
    ({ url: { searchParams } }, res, ctx) => {
      const idsSearchParameters: string[] = searchParams.getAll("id");
      const contingentsIdsMap: Record<string, boolean> =
        idsSearchParameters.reduce<Record<string, boolean>>(
          (idsMap, currentId) => ({ ...idsMap, [currentId]: true }),
          {}
        );

      return res(
        ctx.json(
          contingentsIdsMap.length
            ? contingents.filter(({ id }) => contingentsIdsMap[id])
            : contingents
        )
      );
    }
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
