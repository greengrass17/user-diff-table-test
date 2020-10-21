import React from "react";
import { render } from "@testing-library/react";
import { ThemeProvider } from "@material-ui/core/styles";
import { theme } from "../components/withTheme";
import DataContext, { store as dataStore } from "../stores/dataStore";

function customRender(
  ui: React.ReactElement,
  { store, ...options } = { store: dataStore }
) {
  return render(ui, {
    wrapper: ({ children }) => (
      <DataContext.Provider value={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </DataContext.Provider>
    ),
    ...options,
  });
}

export * from "@testing-library/react";
export { customRender as render };
