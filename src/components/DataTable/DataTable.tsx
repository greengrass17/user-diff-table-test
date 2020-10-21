import React, { useEffect, useContext } from "react";
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
import { observer } from "mobx-react-lite";
import DataContext from "../../stores/dataStore";

const TableCell = withStyles({
  head: {
    fontWeight: "bold",
  },
})(RawTableCell);

export function DataTable() {
  const store = useContext(DataContext)

  const onFetchData = async () => {
    await store.fetchData();
  };

  const handleSortOrder = () => {
    store.switchOrder()
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
                  direction={store.order}
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
            {store.data.length
              ? store.data.map((data) => (
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
          status={store.status}
          fetchData={onFetchData}
        />
      </Box>
    </Paper>
  );
}

export default observer(DataTable);
