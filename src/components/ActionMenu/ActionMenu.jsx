import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

function ActionMenu({ pdfID, projectID }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const projects = useSelector((store) => store.projects);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleAddCustomer = (event) => {
    history.push('/customer-info');
  };

  const handleReview = async (event) => {
    console.log('this id', pdfID);
    console.log('this project id', projectID);
    try {
      // Fetch JSON data from GCS based on project ID
      const response = await axios.get(
        `/api/gcs/files/JSON/${event.target.id}`
      );
      const jsonData = response.data;

      // Generate PDF
      const pdfData = await generatePDF(jsonData);

      // Upload PDF to GCS
      await uploadPDFToGCS(pdfData);

      console.log('PDF generated and uploaded successfully.');

      dispatch({
        type: 'SET_PDF_ID',
        payload: { idpdf: event.target.id },
      });

      dispatch({
        type: 'SET_PROJECTS_ID',
        payload: { projectID },
      });

      // Redirect to '/new-test'
      // history.push('/new-test');
      history.push('/confirmation');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const generatePDF = async (jsonData) => {
    // Your PDF generation logic here
    // Return the generated PDF data
  };

  const uploadPDFToGCS = async (pdfData) => {
    // Your PDF upload logic here
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleReview} id={pdfID} proid={projectID}>
          Send to client for review
        </MenuItem>
        <MenuItem onClick={handleClose}>Create printable PDF</MenuItem>
        <MenuItem onClick={handleClose}>
          <p onClick={handleAddCustomer}>Add Customer Details</p>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <p onClick={() => dispatch({ type: 'SUBMIT_ORDER' })}>
            Send to Publisher
          </p>
        </MenuItem>
      </Menu>
    </div>
  );
}

export default ActionMenu;
