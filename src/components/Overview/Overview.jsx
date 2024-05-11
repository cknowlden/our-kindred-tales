import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
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

function Overview() {
  const projects = useSelector((store) => store.projects);
  const dispatch = useDispatch();
  const history = useHistory();

  const displayProject = (project) => {
    dispatch({ type: 'SET_PROJECT_DETAILS', payload: project });
    history.push(`/details/${project.id}`);
  };

  const handleDelete = (event) => {
    console.log(event.target.id);
    dispatch({
      type: 'DELETE_PROJECT',
      payload: {
        targetId: event.target.id,
      },
    });
  };

  const showConfirmationDelete = (event) => {
    event.preventDefault();
    Swal.fire({
      text: 'Are you sure you want to delete this event?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('The event has been deleted').then(() => handleDelete(event));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
      }
    });
  };

  useEffect(() => {
    dispatch({ type: 'FETCH_PROJECTS' });
  }, [dispatch]);

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Project Name</TableCell>
              <TableCell align="right">Contact</TableCell>
              <TableCell align="right">Last Updated</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Page Count</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((project) => (
              <TableRow
                key={project.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell
                  className="tr"
                  onClick={() => displayProject(project)}
                  component="th"
                  scope="row"
                >
                  {project.project_name || project.bookTitle}
                </TableCell>
                <TableCell align="right">{project.contact}</TableCell>
                <TableCell align="right">{project.last_updated}</TableCell>
                <TableCell align="right">{project.status}</TableCell>
                <TableCell align="right">{project.page_count}</TableCell>
                <TableCell align="right">
                  <ActionMenu pdfID={project.pdfFileId} />
                </TableCell>
                <TableCell align="right">
                  <DeleteOutlineIcon
                    onClick={showConfirmationDelete}
                    id={project.project_id}
                    aria-label="delete"
                    color="primary"
                    size="large"
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default Overview;
