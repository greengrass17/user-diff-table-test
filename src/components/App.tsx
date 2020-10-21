/**
 * TODO:
 * - More test (eg. dataStore)
 * 
 * Note:
 * - Using MobX for such a small project is over-engineering. I use it to prepare to scale the project
 */
import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import withTheme from "./withTheme";
import DataTable from "./DataTable";
import DataContext, { store } from '../stores/dataStore'

export const App = () => {
  return (
    <DataContext.Provider value={store}>
      <Container className="app" fixed>
        <Box marginTop={2}>
          <DataTable />
        </Box>
      </Container>
    </DataContext.Provider> 
  );
};

export default withTheme(App);
