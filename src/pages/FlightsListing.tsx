import * as React from "react";
import Box, { Item } from "devextreme-react/box";

import { FlightsList } from "@features/flights-management";
import { ContingentsList } from "@features/contingents-management";

export default (): JSX.Element => {
  const mainHeadingId = "flightsListingMainHeading";
  const contingentsListSectionId = "contingentsListSection";
  const contingentsListHeadingId = "contingentsListHeading";

  return (
    <main aria-labelledby={mainHeadingId} className="container mx-auto mt-8">
      <h1
        id={mainHeadingId}
        className="capitalize text-center mb-6 text-5xl font-medium"
      >
        Flights list
      </h1>

      <Box direction="row" width="100%" height="100%">
        <Item ratio="6">
          <FlightsList aria-controls={contingentsListSectionId} />
        </Item>
        <Item ratio="0.5"></Item>
        <Item ratio="5">
          <section
            id={contingentsListSectionId}
            aria-labelledby={contingentsListHeadingId}
            aria-live="polite"
          >
            <h2 id={contingentsListHeadingId} className="sr-only">
              Selected flight contingents
            </h2>
            <ContingentsList />
          </section>
        </Item>
      </Box>
    </main>
  );
};
