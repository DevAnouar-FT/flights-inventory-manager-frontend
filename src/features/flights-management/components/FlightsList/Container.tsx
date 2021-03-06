import * as React from "react";

import Presentation from "./Presentation";
import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
  hasFlightsListFetchingFailed,
  isFlightsListLoading,
  selectAllFlights,
} from "@features/flights-management/selectors";
import { fetchAllFlights } from "@features/flights-management/slice";
import { fetchContingentsByFlightId } from "@features/contingents-management";

export type DisplayedFlights = React.ComponentProps<
  typeof Presentation
>["flights"];

export default (): JSX.Element => {
  const flightsListIsLoading: boolean =
    useAppSelector<boolean>(isFlightsListLoading);
  const flightsListFetchingHasFailed: boolean = useAppSelector<boolean>(
    hasFlightsListFetchingFailed
  );

  const flights: DisplayedFlights = useAppSelector<DisplayedFlights>(
    selectAllFlights,
    (previousFlights, currentFlights) => {
      const previousFlightsIds: Record<string, boolean> =
        previousFlights.reduce(
          (idsMap, { id }) => ({ ...idsMap, [id]: true }),
          {}
        );

      return (
        currentFlights.every(({ id }): boolean => previousFlightsIds[id]) &&
        previousFlights.length === currentFlights.length
      );
    }
  );

  const [selectedFlightId, setSelectedFlightId] = React.useState<string>("");
  const currentRenderIsTheFirstOne = React.useRef<boolean>(true);
  const dispatch = useAppDispatch();

  React.useEffect((): void => {
    if (currentRenderIsTheFirstOne.current) {
      dispatch(fetchAllFlights());
      currentRenderIsTheFirstOne.current = false;
    }
  });

  React.useEffect((): void => {
    if (selectedFlightId) {
      dispatch(fetchContingentsByFlightId(selectedFlightId));
    }
  }, [selectedFlightId]);

  return (
    <Presentation
      flights={flights}
      flightsListIsLoading={flightsListIsLoading}
      flightsListFetchingHasFailed={flightsListFetchingHasFailed}
      onFlightSelected={setSelectedFlightId}
    />
  );
};
