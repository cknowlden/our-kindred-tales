import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
import Swal from 'sweetalert2';
import { IconButton } from '@mui/material';

function Overview() {
  const projects = useSelector((store) => store.projects);
  const dispatch = useDispatch();

  //TO DO: insert the projects db info into the table
  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS' });
  }, []);

  const showConfirmationDelete = () => {
    Swal.fire({
      text: 'Are you sure you want to delete this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('The event has been deleted').then(() => handleDelete());
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Actions</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* {rows.map((row) => ( */}
            {projects.map((project) => (
              <TableRow
                key={project.contact}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {project.project_name}
                </TableCell>
                <TableCell align="right">{project.contact}</TableCell>
                <TableCell align="right">{project.last_updated}</TableCell>
                <TableCell align="right">{project.status}</TableCell>
                <TableCell align="right">
                  <ActionMenu />
                </TableCell>
                <TableCell align="right">
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    size="large"
                    onClick={showConfirmationDelete}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* TO DO: add functionality for create new test project */}
      {/* <center>
        <Link to="/new-test">
          <button className="btn">Create New Test Project</button>
        </Link>
      </center> */}
      {/* <h1>{JSON.stringify(projects)}</h1> */}
    </>
  );
}

export default Overview;
