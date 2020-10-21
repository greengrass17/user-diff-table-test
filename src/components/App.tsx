/**
 * TODO:
 * - More test
 * - MobX?
 * - Improve DateJs?
 */
import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";
import withTheme from "./withTheme";
import DataTable from "./DataTable";

export const App = () => {
  return (
    <Container className="app" fixed>
      <Box marginTop={2}>
        <DataTable />
      </Box>
    </Container>
  );
};

export default withTheme(App);
