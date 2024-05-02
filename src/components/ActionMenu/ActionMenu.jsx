import React from "react";
import { useDispatch,} from "react-redux";
import { Link } from 'react-router-dom';

import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MenuIcon from '@mui/icons-material/Menu';

function ActionMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <MenuIcon/>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>
          <button onClick={() => dispatch({ type: "SUBMIT_ORDER" })}>
          Send to Print
          </button>
        </MenuItem>
        <MenuItem onClick={handleClose}>Send to client for review</MenuItem>
        <MenuItem onClick={handleClose}>Client currently reviewing</MenuItem>
        <MenuItem><Link to="/details">View Details</Link></MenuItem>
      </Menu>
    </div>
  );
}

export default ActionMenu;
