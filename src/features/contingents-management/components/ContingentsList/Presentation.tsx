import * as React from "react";
import { Column } from "devextreme-react/data-grid";

import DataGridWithLoadPanel from "@ui/DataGridWithLoadPanel";
import { Contingent } from "@features/contingents-management/types";

interface Props {
  contingentsListIsLoading: boolean;
  contingentsListFetchingHasFailed: boolean;
  contingents: Contingent[];
}

export default ({
  contingentsListIsLoading,
  contingentsListFetchingHasFailed,
  contingents,
}: Props): JSX.Element => {
  const noDataTextKey = React.useRef<
    "loadingContingentsList" | "emptyContingentsList" | "serverError"
  >();

  const noDataTexts: Record<
    "loadingContingentsList" | "emptyContingentsList" | "serverError",
    string
  > = {
    loadingContingentsList: "",
    emptyContingentsList: "Please select a flight to display its contingents.",
    serverError: "Cannot fetch data from the server! Please try again later.",
  };

  if (contingentsListIsLoading) {
    noDataTextKey.current = "loadingContingentsList";
  } else {
    noDataTextKey.current = contingentsListFetchingHasFailed
      ? "serverError"
      : "emptyContingentsList";
  }

  return (
    <DataGridWithLoadPanel
      id="selectedflightContingentsDataGrid"
      dataSource={contingents}
      keyExpr="id"
      showBorders
      noDataText={noDataTextKey.current && noDataTexts[noDataTextKey.current]}
      dataIsLoading={contingentsListIsLoading}
    >
      {[
        {
          dataField: "clientCode",
          caption: "Client Code",
          customizeText({ value }: { value: string }): string {
            return value.toUpperCase();
          },
        },
        {
          dataField: "bookedSeatsCount",
          caption: "Booked Seats Count",
          dataType: "number",
        },
        {
          dataField: "totalSeatsCount",
          caption: "Total Seats Count",
          dataType: "number",
        },
      ].map<React.ReactNode>(
        ({ dataField, dataType, caption, customizeText }) => (
          <Column
            key={dataField}
            dataField={dataField}
            caption={caption}
            customizeText={customizeText}
            dataType={dataType}
          />
        )
      )}
    </DataGridWithLoadPanel>
  );
};
