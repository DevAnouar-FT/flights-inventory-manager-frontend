import * as React from "react";
import { Column } from "devextreme-react/data-grid";

import DataGridWithLoadPanel from "@ui/DataGridWithLoadPanel";
import { Contingent } from "@features/contingents-management/types";

interface Props {
  contingentsListIsLoading: boolean;
  contingents: Contingent[];
}

export default ({
  contingentsListIsLoading,
  contingents,
}: Props): JSX.Element => {
  return (
    <DataGridWithLoadPanel
      id="selectedflightContingentsDataGrid"
      dataSource={contingents}
      keyExpr="id"
      showBorders
      noDataText={
        contingentsListIsLoading
          ? ""
          : "Please select a flight to display its contingents."
      }
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
