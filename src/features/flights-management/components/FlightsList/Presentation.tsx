import * as React from "react";
import { Column } from "devextreme-react/data-grid";

import DataGridWithLoadPanel from "@ui/DataGridWithLoadPanel";

interface Flight {
  id: string;
  iataNumber: string;
  date: string;
  origin: string;
  destination: string;
}

interface Props {
  flights: Flight[];
  onFlightSelected(flightId: string): void;
  flightsListIsLoading: boolean;
  flightsListFetchingHasFailed: boolean;
}

export default ({
  flights,
  onFlightSelected,
  flightsListIsLoading,
  flightsListFetchingHasFailed,
}: Props): JSX.Element => {
  const customizeIataCodeText = ({ value }: { value: string }): string =>
    value.toUpperCase();

  const handleSelectionChange: NonNullable<
    React.ComponentProps<typeof DataGridWithLoadPanel>["onSelectionChanged"]
  > = ({ selectedRowsData }): void => {
    onFlightSelected((selectedRowsData[0] as Flight).id);
  };

  const noDataTextKey = React.useRef<
    "emptyFlightsList" | "serverError" | "loadingFlightsList"
  >();

  const noDataTexts: Record<
    "emptyFlightsList" | "serverError" | "loadingFlightsList",
    string
  > = {
    loadingFlightsList: "",
    emptyFlightsList: "Sorry, no flights available.",
    serverError: "Cannot fetch data from the server! Please try again later.",
  };

  if (flightsListIsLoading) {
    noDataTextKey.current = "loadingFlightsList";
  } else {
    noDataTextKey.current = flightsListFetchingHasFailed
      ? "serverError"
      : "emptyFlightsList";
  }

  return (
    <>
      <DataGridWithLoadPanel
        id="flightsDataGrid"
        dataSource={flights}
        keyExpr="id"
        showBorders
        selection={{ mode: "single" }}
        onSelectionChanged={handleSelectionChange}
        noDataText={noDataTextKey.current && noDataTexts[noDataTextKey.current]}
        dataIsLoading={flightsListIsLoading}
      >
        {[
          {
            dataField: "iataNumber",
            caption: "IATA Flight Number",
            customizeText: customizeIataCodeText,
          },
          { dataField: "date", dataType: "date" },
          {
            dataField: "origin",
            caption: "Origin Airport",
            customizeText: customizeIataCodeText,
          },
          {
            dataField: "destination",
            caption: "Destination Airport",
            customizeText: customizeIataCodeText,
          },
        ].map<React.ReactNode>(
          ({ dataField, caption, customizeText, dataType }) => (
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
    </>
  );
};
