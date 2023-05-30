import Paper from "@mui/material/Paper";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import TablePagination from "@mui/material/TablePagination";
import {Table} from "@mui/material";
import { useRef } from "react";

const TableComponent = ({ columns, data = [], rowsPerPage, page, onClickHandler, changePageHandler, rowPerPageHandler, pageCount }) => {
    const windowSize = useRef([window.innerWidth, window.innerHeight]);

  return (
      <div className="trip-table">
          <Paper sx={{width: '100%', overflow: 'hidden'}}>
              <TableContainer sx={{height: windowSize.current[1] * 3 / 4}}>
                  <Table stickyHeader aria-label="sticky table">
                      <TableHead>
                          <TableRow style={{ backgroundColor: 'blue' }}>
                              {columns.map((column) => (
                                  <TableCell
                                      key={column.id}
                                      align={column.align}
                                      style={{minWidth: column.minWidth}}
                                  >
                                      {column.label}
                                  </TableCell>
                              ))}
                          </TableRow>
                      </TableHead>
                      <TableBody>
                          {data
                              .map((row) => {
                                  return (
                                      <TableRow onClick={() => onClickHandler(row.id)} hover role="checkbox" tabIndex={-1} key={row.id}>
                                          {columns.map((column) => {
                                              const value = row[column.id];
                                              return (
                                                  <TableCell key={column.id} align={column.align}>
                                                      {column.format && typeof value === 'number'
                                                          ? column.format(value)
                                                          : value}
                                                  </TableCell>
                                              );
                                          })}
                                      </TableRow>
                                  );
                              })}
                      </TableBody>
                  </Table>
              </TableContainer>
              <TablePagination
                  rowsPerPageOptions={[25, 50, 100]}
                  component="div"
                  count={pageCount}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={changePageHandler}
                  onRowsPerPageChange={rowPerPageHandler}
              />
          </Paper>
      </div>
  );
}

export default TableComponent;