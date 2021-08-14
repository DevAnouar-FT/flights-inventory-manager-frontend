import * as React from "react";

import DataGrid, { Column } from "devextreme-react/data-grid";

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
}

export default ({ flights, onFlightSelected }: Props): JSX.Element => {
  const customizeIataCodeText = ({ value }: { value: string }) =>
    value.toUpperCase();

  const handleSelectionChange: NonNullable<
    React.ComponentProps<typeof DataGrid>["onSelectionChanged"]
  > = ({ selectedRowsData }): void => {
    onFlightSelected((selectedRowsData[0] as Flight).id);
  };

  return (
    <DataGrid
      dataSource={flights}
      keyExpr="id"
      showBorders
      selection={{ mode: "single" }}
      onSelectionChanged={handleSelectionChange}
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
    </DataGrid>
  );
};
