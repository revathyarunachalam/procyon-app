"use client";
import React, {useEffect, useState} from "react";
import { getData } from "../api/data";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Avatar from '@mui/material/Avatar';
import TablePagination from '@mui/material/TablePagination';

const columns = [
  'Title',
  'Price',
];

const DataTable = ({data}) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      data.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage,
      ),
    [page, rowsPerPage],
  );

  return (
    <Paper>
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} aria-label="simple table">
      <TableHead>
        <TableRow>
            <TableCell align="left"></TableCell>
            {columns.map((col) => {
                return <TableCell key={col} align="left">{col}</TableCell>
            })}
        </TableRow>
      </TableHead>
      <TableBody>
        {visibleRows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          > 
            <TableCell align="left">
                <Avatar alt="Remy Sharp" src={row['thumbnail']} />
            </TableCell>
            {columns.map(col => {
                return <TableCell key={col} align="left">{row[col.toLowerCase()]}</TableCell>
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </TableContainer>
    <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
  );
}

const Home = () => {
    const [data, setData] = useState({});
    useEffect(() => {
        getData().then(setData);
    }, []);

    if (!data.products) return <div>Loading data...</div>

    const {products} = data;

    return <div>
        {products && <DataTable data={products} />}
    </div>
}

export default Home;
