import * as React from "react";

import { useAppSelector } from "@app/hooks";
import {
  hasContingentsListFetchingFailed,
  isContingentsListLoading,
  selectContingents,
} from "@features/contingents-management/selectors";
import { Contingent } from "@features/contingents-management/types";

import Presentation from "./Presentation";

export default (): JSX.Element => {
  const contingentsListIsLoading: boolean = useAppSelector<boolean>(
    isContingentsListLoading
  );
  const contingentsListFetchingHasFailed: boolean = useAppSelector<boolean>(
    hasContingentsListFetchingFailed
  );

  const contingents: Contingent[] = useAppSelector<Contingent[]>(
    selectContingents,
    (previousContingents, currentContingents) => {
      const previousContingentsIds: Record<string, boolean> =
        previousContingents.reduce(
          (idsMap, { id }) => ({ ...idsMap, [id]: true }),
          {}
        );

      return (
        currentContingents.every(
          ({ id }): boolean => previousContingentsIds[id]
        ) && previousContingents.length === currentContingents.length
      );
    }
  );

  return (
    <Presentation
      contingents={contingents}
      contingentsListIsLoading={contingentsListIsLoading}
      contingentsListFetchingHasFailed={contingentsListFetchingHasFailed}
    />
  );
};
