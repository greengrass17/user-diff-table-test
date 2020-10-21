import React from "react";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Status } from "../../stores/dataStore";

type TableControlProps = {
  status?: Status,
  fetchData: Function
}

function TableControl({ status, fetchData } : TableControlProps) {
  const onFetch = () => {
    fetchData && fetchData();
  };

  switch (status) {
    case 'loading':
      return <CircularProgress />;

    case 'error':
      return (
        <>
          <Box marginBottom={1}>
            <Typography color="error" data-testid="error-message">
              We had problems fetching your data. Please try again
            </Typography>
          </Box>
          <Button variant="contained" color="primary" onClick={onFetch} data-testid="retry-button">
            Retry
          </Button>
        </>
      );

    default:
      return (
        <Button variant="contained" color="primary" onClick={onFetch} data-testid="load-button">
          Load more
        </Button>
      );
  }
}

export default TableControl;
