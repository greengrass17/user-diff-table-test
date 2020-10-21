import React, { useState, useEffect } from "react";
import DateJs from "../../lib/utils/date";

import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import RawTableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Box from "@material-ui/core/Box";
import { withStyles } from "@material-ui/core/styles";
import TableControl from "./TableControl";
import withData, { DataComponentProps } from "./withData";

const TableCell = withStyles({
  head: {
    fontWeight: "bold",
  },
})(RawTableCell);

export function DataTable({ data, fetchData, order, setOrder } : DataComponentProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const onFetchData = async () => {
    setLoading(true);
    setError(undefined);
    try {
      await fetchData();
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSortOrder = () => {
    setOrder(order === "desc" ? "asc" : "desc");
  };

  useEffect(() => {
    onFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Paper>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active
                  direction={order}
                  onClick={handleSortOrder}
                  data-testid="date-header"
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Old value</TableCell>
              <TableCell>New value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.length
              ? data.map((data) => (
                  <TableRow key={data.timestamp}>
                    <TableCell scope="row">
                      {new DateJs(data.timestamp).toFormattedDateString(
                        "yyyy-mm-dd"
                      )}
                    </TableCell>
                    <TableCell>{data.id}</TableCell>
                    <TableCell>{data.diff[0].oldValue}</TableCell>
                    <TableCell>{data.diff[0].newValue}</TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2} alignItems="center" display="flex" flexDirection="column">
        <TableControl
          status={loading ? "loading" : error ? "error" : ""}
          fetchData={onFetchData}
        />
      </Box>
    </Paper>
  );
}

export default withData(DataTable);
