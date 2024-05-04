import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function Details() {
  const project = useSelector((store) => store.viewDetails);
  const { projectId } = useParams();
  // const [heading, setHeading] = useState('Functional Component');

  return (
    <>
      <h1>{projectId}</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {project.project_name}
              </TableCell>
              <TableCell align="right">{project.contact}</TableCell>
              <TableCell align="right">{project.last_updated}</TableCell>
              <TableCell align="right">{project.status}</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

{
  /* <div>
  <h2>
    {project.project_name} {project.contact} {project.last_updated}{' '}
    {project.status}
  </h2>
</div>; */
}
export default Details;
