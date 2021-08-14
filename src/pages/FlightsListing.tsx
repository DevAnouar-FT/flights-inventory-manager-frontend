import * as React from "react";
import Box, { Item } from "devextreme-react/box";

import { FlightsList } from "@features/flights-management";

export default (): JSX.Element => {
  const mainHeadingId = "flightsListingMainHeading";
  const contingentsListSectionId = "contingentsListSection";
  const contingentsListHeadingId = "contingentsListHeading";

  return (
    <main aria-labelledby={mainHeadingId}>
      <h1 id={mainHeadingId} className="capitalize">
        Flights list
      </h1>

      <Box direction="col" width="100%" height="100%">
        <Item ratio="2">
          <FlightsList aria-controls={contingentsListSectionId} />
        </Item>
        <Item ratio="1">
          <section
            id={contingentsListSectionId}
            aria-labelledby={contingentsListHeadingId}
            aria-live="polite"
          >
            <h2 id={contingentsListHeadingId} className="capitalize">
              Selected flight contingents
            </h2>
            <div />
          </section>
        </Item>
      </Box>
    </main>
  );
};
