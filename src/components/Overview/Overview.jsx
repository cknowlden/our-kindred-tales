import React from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ActionMenu from '../ActionMenu/ActionMenu';

function Overview() {
  function createData(name, updated, status) {
    return { name, updated, status };
  }

  //TO DO: Replace the below rows with actual project data from database
  const rows = [
    createData('Project #1', '2024-01-09', 'Customer Working'),
    createData('Project #2', '2024-04-11', 'Ready for Print'),
  ];

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.updated}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">
                  <ActionMenu/>
                </TableCell>
                <TableCell align="right">
                  <Link to="/details">
                    <button>View Details</button>
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <DeleteOutlineIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <center>
        <Link to="/new-test">
          <button className="btn">Create New Test Project</button>
        </Link>
      </center>
    </>
  );
}

export default Overview;
