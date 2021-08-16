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
}

export default ({
  flights,
  onFlightSelected,
  flightsListIsLoading,
}: Props): JSX.Element => {
  const customizeIataCodeText = ({ value }: { value: string }): string =>
    value.toUpperCase();

  const handleSelectionChange: NonNullable<
    React.ComponentProps<typeof DataGridWithLoadPanel>["onSelectionChanged"]
  > = ({ selectedRowsData }): void => {
    onFlightSelected((selectedRowsData[0] as Flight).id);
  };

  return (
    <>
      <DataGridWithLoadPanel
        id="flightsDataGrid"
        dataSource={flights}
        keyExpr="id"
        showBorders
        selection={{ mode: "single" }}
        onSelectionChanged={handleSelectionChange}
        noDataText={flightsListIsLoading ? "" : "Sorry, no flights available."}
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
