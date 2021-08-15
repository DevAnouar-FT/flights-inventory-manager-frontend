import * as React from "react";
import { render as rtlRender } from "@testing-library/react";
import { Provider } from "react-redux";

import { store } from "@app/store";

function render(ui: React.ReactElement): ReturnType<typeof rtlRender> {
  function Wrapper({ children }: { children: React.ReactNode }): JSX.Element {
    return <Provider store={store}>{children}</Provider>;
  }

  return rtlRender(ui, { wrapper: Wrapper as React.FunctionComponent });
}

export * from "@testing-library/react";

export { render };
