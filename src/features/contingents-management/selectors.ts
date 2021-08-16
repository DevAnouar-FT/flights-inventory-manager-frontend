import { createSelector } from "@reduxjs/toolkit";

import { RootState } from "@app/store";
import { FetchStatus } from "@app/types";
import { Contingent } from "./types";

export const selectContingents = createSelector<
  RootState,
  RootState["contingentsManager"]["contingents"],
  Contingent[]
>(
  (rootState) => rootState.contingentsManager.contingents,
  (contingents) => contingents
);

export const isContingentsListLoading = createSelector<
  RootState,
  RootState["contingentsManager"]["fetchStatus"],
  boolean
>(
  (rootState) => rootState.contingentsManager.fetchStatus,
  (fetchStatus): boolean => fetchStatus === FetchStatus.LOADING
);
