import React, { FC } from 'react'
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import blue from "@material-ui/core/colors/blue";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: blue[500]
    },
  },
  overrides: {
    MuiButton: {
      label: {
        textTransform: 'initial',
        fontWeight: 'bold'
      }
    },
    MuiCssBaseline: {
      '@global': {
        body: {
          margin: 0
        }
      }
    }
  }
});

function withTheme(Component : FC) {
  return (props : object) => (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Component {...props} />
    </ThemeProvider>
  )
}

export default withTheme
