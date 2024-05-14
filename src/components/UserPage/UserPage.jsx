import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  return (
    <div>
      <center>
        <img
          src={'/public/kindredtaleslogo.png'}
          alt="Checkmark"
          className="checkmark"
        />
      </center>
      <br />
      <center>
        <h1>Welcome, {user.username}!</h1>
        <h2>Please proceed to the Overview Page to view current projects</h2>
        <Link to="Overview">
          <button className="btn">Overview</button>
        </Link>
      </center>
    </div>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
