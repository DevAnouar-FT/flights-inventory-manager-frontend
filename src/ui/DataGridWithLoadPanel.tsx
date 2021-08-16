import * as React from "react";

import DataGrid from "devextreme-react/data-grid";
import LoadPanel from "devextreme-react/load-panel";

interface Props
  extends Omit<React.ComponentProps<typeof DataGrid>, "loadPanel"> {
  dataIsLoading: Pick<
    React.ComponentProps<typeof LoadPanel>,
    "visible"
  >["visible"];
  children?: React.ReactNode;
}

export default ({
  children,
  dataIsLoading,
  id,
  ...dataGridProps
}: Props): JSX.Element => {
  const loadPanelId = `loadPanel-${id}`;

  /**
   * This is to set the data-test-id attribute to data rows for testing purposes only
   */
  const handleRowPrepared: React.ComponentProps<
    typeof DataGrid
  >["onRowPrepared"] =
    process.env.NODE_ENV !== "production"
      ? ({ rowType, rowElement, data }) => {
          if (rowType === "data") {
            rowElement.setAttribute(
              "data-testid",
              `${id}_row_${(data as { id: string }).id}`
            );
          }
        }
      : undefined;

  /**
   * This is to set the data-test-id attribute to the load panel wrapper element for testing purposes only
   */
  React.useLayoutEffect(() => {
    if (process.env.NODE_ENV !== "production" && dataIsLoading) {
      document
        .getElementById(loadPanelId)
        ?.setAttribute("data-testid", loadPanelId);
    }
  }, [dataIsLoading]);

  return (
    <>
      <DataGrid {...dataGridProps} id={id} onRowPrepared={handleRowPrepared}>
        {children}
      </DataGrid>
      <LoadPanel
        id={loadPanelId}
        visible={dataIsLoading}
        position={{ of: `#${id}` }}
        shadingColor="rgba(0, 0, 0, 0.1)"
      />
    </>
  );
};
