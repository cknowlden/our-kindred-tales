// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useHistory } from 'react-router-dom';

// import Button from '@mui/material/Button';
// import Menu from '@mui/material/Menu';
// import MenuItem from '@mui/material/MenuItem';
// import MenuIcon from '@mui/icons-material/Menu';

// function ActionMenu({ id }) {
//   const dispatch = useDispatch();
//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const history = useHistory();
//   const projects = useSelector((store) => store.projects);

//   // const project = useSelector((store) => store.projects);

//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const handleReview = (event) => {
//     event.preventDefault();
//     dispatch({
//       type: 'SET_PROJECTS_ID',
//       payload: event.target.id,
//     });
//     history.push('/new-test');
//   };

//   // const displayProject = (projectDisplay) => {
//   //   console.log(projectDisplay);
//   //   dispatch({ type: 'SET_PROJECT_DETAILS', payload: projectDisplay });
//   //   history.push('/details');
//   // };

//   return (
//     <div>
//       <Button
//         id="basic-button"
//         aria-controls={open ? 'basic-menu' : undefined}
//         aria-haspopup="true"
//         aria-expanded={open ? 'true' : undefined}
//         onClick={handleClick}
//       >
//         <MenuIcon />
//       </Button>
//       <Menu
//         id="basic-menu"
//         anchorEl={anchorEl}
//         open={open}
//         onClose={handleClose}
//         MenuListProps={{
//           'aria-labelledby': 'basic-button',
//         }}
//       >
//         <MenuItem onClick={handleReview} id={id}>
//           Send to client for review
//         </MenuItem>
//         <MenuItem onClick={handleClose}>Create printable PDF</MenuItem>
//         <MenuItem onClick={handleClose}>
//           <p onClick={() => dispatch({ type: 'SUBMIT_ORDER' })}>
//             Send to Publisher
//           </p>
//         </MenuItem>
//       </Menu>
//     </div>
//   );
// }

// export default ActionMenu;



import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';

function ActionMenu({ id, pdfid }) {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReview = async (event) => {
    console.log('this id', id);
    console.log('this pdfid', pdfid);
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

      // Redirect to '/new-test'
    } catch (error) {
      console.error('Error:', error);
    }
    history.push('/new-test');
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
        <MenuItem onClick={handleReview} id={id} pdfid={pdfid}>
          Send to client for review
        </MenuItem>
        <MenuItem onClick={handleClose}>Create printable PDF</MenuItem>
        <MenuItem onClick={handleClose}>
          <Link to="/customer-info">
            <p>Add Customer Details</p>
          </Link>
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
